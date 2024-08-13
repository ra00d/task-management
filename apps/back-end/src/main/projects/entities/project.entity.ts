import { User } from "auth/entities/user.entity";
import { BaseEntity } from "common/entities/base.entity";
import { Task } from "main/tasks/entities/task.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Project extends BaseEntity {
	@Column()
	name: string;

	@Column()
	description: string;

	@ManyToOne(
		() => User,
		(user) => user.projects,
		{
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		},
	)
	user: User;

	@OneToMany(
		() => Task,
		(task) => task.project,
	)
	tasks: Task[];
	constructor(args: Partial<Project>) {
		super(args);
		this.toEntity(args);
	}
}
