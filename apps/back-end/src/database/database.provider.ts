import { Provider } from "@nestjs/common";
import { DB } from "common/constants/database.constants";
import { EntityManager } from "typeorm";

export const databaseProvider: Provider[] = [
	{
		provide: DB,
		useFactory(entityManager: EntityManager) {
			return entityManager;
		},
		inject: [EntityManager],
	},
];
