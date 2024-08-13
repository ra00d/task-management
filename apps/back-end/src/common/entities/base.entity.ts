import {
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

// BASE ENTITY FOR ALL TABLES
export abstract class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@CreateDateColumn()
	createdAt: Date;
	@DeleteDateColumn()
	deletedAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
	toEntity<T extends object>(args: Partial<T>) {
		Object.assign(this, args);
	}

	constructor(args: any) {
		this.toEntity(args);
	}
}
