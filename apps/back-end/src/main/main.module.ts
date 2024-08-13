import { Module } from "@nestjs/common";
import { DashboardController } from "./dashboard/dashboard.controller";
import { MainController } from "./main.controller";
import { ProjectsModule } from "./projects/projects.module";
import { SettingsModule } from "./settings/settings.module";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";
import { ProfileModule } from "./profile/profile.module";
import { APP_GUARD } from "@nestjs/core";
import { SessionGuard } from "auth/guards/session.guard";
@Module({
	imports: [
		SettingsModule,
		TasksModule,
		ProjectsModule,
		UsersModule,
		ProfileModule,
	],
	controllers: [MainController, DashboardController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: SessionGuard,
		},
	],
})
export class MainModule {}
