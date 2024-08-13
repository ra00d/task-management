import { Task } from "main/tasks/entities/task.entity";
import { User as TUser } from "src/auth/entities/user.entity";

// export {};
export declare module "express-session" {
	interface SessionData {
		views: number;
		passport: {
			user?: TUser;
		};
	}
}
declare global {
	namespace Express {
		interface User {
			id: string;
			name: string;
			email: string;
			role: "ADMIN" | "USER" | string;
			tasks?: Task[];
		}
	}
}
