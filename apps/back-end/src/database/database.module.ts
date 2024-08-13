import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "./naming.strategy";
import { databaseProvider as databaseProviders } from "./database.provider";

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => {
				const dbType =
					configService.getOrThrow<TypeOrmModuleOptions["type"]>(
						"DATABASE_TYPE",
					);
				const options: TypeOrmModuleOptions = {
					type: dbType || "mysql",
					host: configService.getOrThrow("DATABASE_HOST"),
					username: configService.getOrThrow("DATABASE_USER"),
					password: configService.getOrThrow<string>("DATABASE_PASSWORD"),
					database: configService.getOrThrow("DATABASE_NAME"),
					port: configService.getOrThrow("DATABASE_PORT"),
					synchronize: configService.getOrThrow("DATABASE_SYNCHRONIZE"), // configService.getOrThrow('NODE_ENV') === 'development',
					// logger: 'debug',
					// logging: ['query', 'error'],
					// logging: true,
					entities: [__dirname + "/../**/*.entity{.ts,.js}"],
					autoLoadEntities: true,
					namingStrategy: new SnakeNamingStrategy(),
				} as TypeOrmModuleOptions;

				return options;
			},
			inject: [ConfigService],
		}),
	],
	providers: [...databaseProviders],
	exports: [...databaseProviders],
})
export class DatabaseModule {}
