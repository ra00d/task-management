import * as bycrypt from "bcrypt";
import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Project } from "main/projects/entities/project.entity";
import { Task } from "main/tasks/entities/task.entity";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		unique: true,
	})
	email: string;

	@Column()
	name: string;

	@Column()
	@Exclude()
	password: string;

	@Column("varchar")
	role: "ADMIN" | "USER";

	@Column({
		default: true,
	})
	active: boolean;

	@Column({
		nullable: true,
	})
	lastLogin: Date;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(
		() => Task,
		(task) => task.user,
	)
	tasks: Task[];

	@OneToMany(
		() => Project,
		(project) => project.user,
	)
	projects: Project[];

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		const salt = await bycrypt.genSalt(10);
		const hashedPassword = await bycrypt.hash(this.password, salt);
		if (!(await bycrypt.compare(this.password, this.password)))
			this.password = hashedPassword;
	}
}
