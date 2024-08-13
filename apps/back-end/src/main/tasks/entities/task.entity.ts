import { User } from "auth/entities/user.entity";
import { Expose } from "class-transformer";
import { BaseEntity } from "common/entities/base.entity";
import { Project } from "main/projects/entities/project.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Task extends BaseEntity {
	@Column()
	title: string;

	@Column()
	description: string;

	@Column("varchar")
	status: "completed" | "pending" | "overDue";

	@Column({ type: "datetime" })
	dueDate: Date;

	@ManyToOne(
		() => User,
		(user) => user.tasks,
		{
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		},
	)
	user: User;
	@ManyToOne(
		() => Project,
		(project) => project.tasks,
		{
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		},
	)
	project: Project;
	@Expose({ name: "projectId" })
	getProjectId() {
		return this.project?.id;
	}

	@Expose({ name: "userId" })
	getUserId() {
		return this.user?.id;
	}
}
