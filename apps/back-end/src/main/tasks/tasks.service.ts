import { Inject, Injectable } from "@nestjs/common";
import { EntityManager, Equal } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { User } from "auth/entities/user.entity";
import { Project } from "main/projects/entities/project.entity";

@Injectable()
export class TasksService {
  constructor(@Inject(EntityManager) private readonly db:EntityManager){}
 
    async create(createTaskDto: CreateTaskDto) {
	const task=this.db.create(Task,createTaskDto)
	task.user=await this.db.findOneBy(User,{id:Equal(createTaskDto.userId)})
	task.project=await this.db.findOneBy(Project,{id:createTaskDto.projectId})
	return await this.db.save(task)
  }
	async findAll(user:User) {
	return await this.db.find(Task,{
	  where:{
user:user.role==='USER'?{
id:user.id
}:undefined,
	  },
	  relations:{
		user:true,
		project:true
	  }
	  	})
	}

	async findOne(id: number) {
	return await this.db.findOne(Task,{where:{id},relations:{
	  project:true,
	  user:true
	}})
	}

	async update(id: number, updateTaskDto: UpdateTaskDto) {

const task=this.db.create(Task,{...updateTaskDto,id})
	task.user=await this.db.findOneBy(User,{id:updateTaskDto.userId})
	
	task.project=await this.db.findOneBy(Project,{id:updateTaskDto.projectId})

	return await this.db.save(task)
	}

	async remove(id: number) {
	await this.db.delete(Task,{
	 id 
	})
	}
  async makeTaskCompleted(id:number){
	const task=await this.db.findOneOrFail(Task,{
	  where:{
		id
	  },
	  relations:{
		user:true
	  }
	});
	task.status='completed';
	return await this.db.save(task)
  }
}
