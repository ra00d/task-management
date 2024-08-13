import { IsDate, IsIn, IsNotEmpty } from "class-validator";

export class CreateTaskDto {
	@IsNotEmpty()
	title: string;
	@IsNotEmpty()
	description: string;
	@IsNotEmpty()
	@IsIn(["completed", "pending", "overDue"])
	status: "completed" | "pending" | "overDue";
	@IsDate()
	dueDate: Date;
	@IsNotEmpty()
	userId: number;
	@IsNotEmpty()
	projectId: number;
}
