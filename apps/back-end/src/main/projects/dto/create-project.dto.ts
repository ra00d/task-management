import { IsNotEmpty, IsString, Min } from "class-validator";
import { Project } from "../entities/project.entity";

export class CreateProjectDto {
	@IsNotEmpty()
	@IsString()
	@Min(3)
	name: string;

	@IsNotEmpty()
	@IsString()
	@Min(3)
	description: string;

	@IsNotEmpty()
	userId: number;
	toProject(): Project {
		return new Project({
			name: this.name,
			description: this.description,
		});
	}
}
