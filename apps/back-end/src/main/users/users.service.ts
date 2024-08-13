import { Inject, Injectable } from '@nestjs/common';
import { User } from 'auth/entities/user.entity';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(@Inject(EntityManager) private readonly db:EntityManager){}
  async  getAllUsers() {
  	return await this.db.find(User,{
	  where:{
		role:"USER"
	  }
	})
  }
  async create(body:CreateUserDto){
	const user= this.db.create(User,{
	  email:body.email,
	  password:body.password,
	  name:body.name,
	  role:"USER",
	  active:true
	  
	});

	return await this.db.save(user)
  }
    async findOne(id: number) {
	return await this.db.findOneOrFail(User,{
	  where:{id}
	})
  }

    async deleteUser(id: number) {
	return await this.db.delete(User,{id})
    }
}
