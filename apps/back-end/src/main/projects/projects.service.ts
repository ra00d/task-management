import { Inject, Injectable } from '@nestjs/common';
import { User } from 'auth/entities/user.entity';
import { EntityManager } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  /**
   *
   */
  constructor(@Inject(EntityManager)private readonly db:EntityManager ) {
	 
  }

  async create(createProjectDto: CreateProjectDto,user :User) {
	const project=createProjectDto.toProject()
	project.user=	await this.db.findOneBy(User,{id:user.role==='ADMIN'?createProjectDto.userId:user?.id})
	  return await this.db.save(project)
  }

  findAll(user:User) {
	return this.db.find(Project,{
	  relations:{tasks:true},
	  where:{
		user:user.role==='USER'?{id:user.id}:undefined
	  }
	})
  }

  findOne(id: number,user:User) {
	return this.db.findOne(Project,{where:{id,
		user:user.role==='USER'?{id:user.id}:undefined
	},relations:{tasks:true}
	})
  }

  async update(id: number, updateProjectDto: UpdateProjectDto,user:User) {

	const project=await this.db.findOneByOrFail(Project,{id})
	project.name=updateProjectDto.name;
	project.description=updateProjectDto.description;
	project.user=await this.db.findOneBy(User,{id:user.id})

	return await this.db.save(project)
  }

  remove(id: number) {
	return this.db.delete(Project,{id})
  }
}
