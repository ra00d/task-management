import {
	RequestMethod,
	UnprocessableEntityException,
	ValidationPipe,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as hbs from "hbs";
import { join } from "path";
import { AppModule } from "./app.module";
import { AuthFilter } from "./common/filter/auth/auth.filter";
import { ValidationError } from "class-validator";
import { NotFoundFilter } from "common/filters/not-found/not-found.filter";
import { CsrfInvalidFilter } from "common/filters/csrf-invalid/csrf-invalid.filter";
async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		// logger: ["warn", "error", "fatal"],
		cors: {
			origin: [
				"http://localhost:5173",
				"http://localhost:9000",
				"http://localhost:1911",
				"https://task-management-wf4j.onrender.com/",
			],
			credentials: true,
		},
	});
	app.setGlobalPrefix("/api", {
		exclude: [
			{
				path: "/",
				method: RequestMethod.ALL,
			},
			{
				path: "/en",
				method: RequestMethod.GET,
			},
			{
				path: "/ar",
				method: RequestMethod.GET,
			},
			{
				path: "mail",
				method: RequestMethod.GET,
			},
		],
	});
	app.useStaticAssets(join(__dirname, "..", "..", "public"));
	app.setBaseViewsDir(join(__dirname, "..", "views"));
	hbs.registerPartials(join(__dirname, "..", "views", "partials"));
	app.setViewEngine("hbs");
	hbs.localsAsTemplateData(app);
	const blocks = {};
	hbs.registerHelper("extend", function (name, context) {
		let block = blocks[name];
		if (!block) {
			block = blocks[name] = [];
		}
		block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
	});
	hbs.registerHelper("block", function (name) {
		const val = (blocks[name] || []).join("\n");
		blocks[name] = [];
		return val;
	});

	app.useGlobalFilters(
		new AuthFilter(),
		new NotFoundFilter(),
		new CsrfInvalidFilter(),
	);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
			enableDebugMessages: true,
			errorHttpStatusCode: 422,
			exceptionFactory: (errors: ValidationError[]) => {
				const errorMessages: Record<string, string> = {};
				errors.forEach((err) => {
					errorMessages[err.property] = Object.values(err.constraints)[0];
				});
				return new UnprocessableEntityException({ errors: errorMessages }, {});
			},
		}),
	);

	await app.listen(3000).then(() => console.log(`http://localhost:3000`));
}
bootstrap();
