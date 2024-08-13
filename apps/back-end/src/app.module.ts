import {
	ClassSerializerInterceptor,
	ForbiddenException,
	HttpException,
	MiddlewareConsumer,
	Module,
	NestModule,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
	AcceptLanguageResolver,
	CookieResolver,
	HeaderResolver,
	I18nModule,
	QueryResolver,
} from "nestjs-i18n";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";

import { APP_INTERCEPTOR } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeormStore } from "connect-typeorm";
import * as cookieParser from "cookie-parser";
import { csrfSync } from "csrf-sync";
import { NextFunction, Request, Response } from "express";
import * as session from "express-session";
import helmet from "helmet";
import mailerConfog from "mailer/config/mailer.confog";
import { randomBytes } from "node:crypto";
import { DataSource } from "typeorm";
import { Session } from "./auth/entities/session.entity";
import { MainModule } from "./main/main.module";
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true,
			load: [mailerConfog],
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "public"),
			// serveRoot: "/control",
		}),
		I18nModule.forRoot({
			fallbackLanguage: "ar",
			logging: true,
			disableMiddleware: false,
			loaderOptions: {
				path: join(__dirname, "i18n"),

				watch: true,
			},
			resolvers: [
				new CookieResolver(["lang", "X-Lang", "app-lang"]),
				{ use: QueryResolver, options: ["lang"] },
				AcceptLanguageResolver,
				new HeaderResolver(["X-Lang", "accept-language"]),
			],
			viewEngine: "hbs",
		}),
		DatabaseModule,
		AuthModule,
		MainModule,
		// MailerModule,

		// JobsModule,

		// WARN: do not remove this comments injected_module;
	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
	],
})
export class AppModule implements NestModule {
	constructor(
		private readonly dataSource: DataSource,
		private readonly configService: ConfigService,
	) {}

	configure(consumer: MiddlewareConsumer) {
		const ignoredMethodsSet = new Set([]);
		const { generateToken, isRequestValid } = csrfSync({
			ignoredMethods: ["OPTIONS"],
			getTokenFromRequest: (req) => {
				return req.headers["x-xsrf-token"] as any;
			},
		});

		consumer
			.apply(
				cookieParser(this.configService.get("COOKIE_SECRET")),
				session({
					resave: true,
					saveUninitialized: false,
					rolling: true,

					store: new TypeormStore({
						cleanupLimit: 2,
						limitSubquery: false, // If using MariaDB.
						ttl: 86400 * 7,
						cookie: {
							sameSite: "strict",
						},
					}).connect(this.dataSource.getRepository(Session)),

					secret: this.configService.getOrThrow("SESSION_SECRET"),
					cookie: {
						sameSite: "strict",
					},
				}),
				(_req: Request, res: Response, next: NextFunction) => {
					// generate a content policyonEvry request
					res.locals.cspNonce = randomBytes(32).toString("hex");
					next();
				},
				// helmet({
				// 	crossOriginResourcePolicy: {
				// 		policy: "same-site",
				// 	},
				// 	// contentSecurityPolicy: {
				// 	// 	useDefaults: false,
				// 	// 	directives: {
				// 	// 		defaultSrc: ["'self'"],
				// 	// 		scriptSrc: [
				// 	// 			"'self'",
				// 	// 			(_req, res: Response) => `'nonce-${res.locals.cspNonce}'`,
				// 	// 		],
				// 	// 		styleSrc: ["'self'", "'unsafe-inline'"],
				// 	//
				// 	// 		imgSrc: ["'self'", "data:"],
				// 	// 		fontSrc: ["'self'"],
				// 	// 		connectSrc: ["'self'"],
				// 	// 	},
				// 	// },
				// }),
				// passport.initialize({}),
				// passport.session({
				//   pauseStream: true,
				// }),
				(req: Request, res: Response, next: NextFunction) => {
					const lang = req.query.lang || "ar";
					res.locals.lang = lang;
					res.cookie("lang", lang, {
						maxAge: 86400000,
						sameSite: "strict",
					});
					next();
				},
				(req: Request, res: Response, next: NextFunction) => {
					req.csrfToken = (overwrite) => generateToken(req, overwrite);
					if (req.path.includes("csrf-token")) {
						// req.csrfToken = function (overwrite?: boolean) {
						// 	return generateToken(this, overwrite);
						// };
						res.json({ token: generateToken(req) });
					} else if (req.path.includes("auth") || !req.path.includes("api")) {
						next();
					} else {
						if (ignoredMethodsSet.has(req.method)) {
							next();
						} else {
							const isCsrfValid = isRequestValid(req);
							if (!isCsrfValid) {
								return next(new HttpException("invalid token", 419));
							}
							next();
						}
						// csrfSynchronisedProtection(req, res, next);
						// next();
					}
				},
			)
			.forRoutes("*");
	}
}
