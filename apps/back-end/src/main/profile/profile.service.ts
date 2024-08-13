import { Inject, Injectable } from '@nestjs/common';
import { User } from 'auth/entities/user.entity';
import { DB } from 'common/constants/database.constants';
import { Task } from 'main/tasks/entities/task.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(@Inject(DB) private readonly db:EntityManager){}
  async getProfile(id:number){
	
return await this.db.findOne(User,{
	where:{id},
	  relations:{
		tasks:true	  }
	},)
  }
  async getTasks(id:number){
return await this.db.find(Task,{where:{user:{id}},relations:{
	  user:false
	}})
  }
}
