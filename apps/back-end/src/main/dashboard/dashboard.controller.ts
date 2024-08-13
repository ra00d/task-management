import { Controller, Get, Inject } from '@nestjs/common';
import { Auth } from 'auth/decorators/auth.decorator';
import { AuthUser } from 'auth/decorators/user.decorator';
import { User } from 'auth/entities/user.entity';
import { Project } from 'main/projects/entities/project.entity';
import { Task } from 'main/tasks/entities/task.entity';
import { EntityManager } from 'typeorm';

@Controller('dashboard')
@Auth('USER','ADMIN')
export class DashboardController {
  constructor(@Inject(EntityManager)private readonly db:EntityManager){}
  @Get()
  async getInfo(@AuthUser() user:User){
	// Number of tasks 
	const completedTasks=await this.db.countBy(Task,{
		status:"completed",
	  user:user?.role==='USER'?{id:user.id}:undefined
	  
	})
	const overDueTasks=await this.db.countBy(Task,{
	  status:"overDue",
	  user:user?.role==='USER'?{id:user.id}:undefined
	})
const penddingTasks=await this.db.countBy(Task,{
	  status:"pending",
	  user:user?.role==='USER'?{id:user.id}:undefined
	})
	const projects=await this.db.count(Project,{
	  where:{
tasks:{

	  user:user?.role==='USER'?{id:user.id}:undefined
}
	  }
	})
	return {
	  totalTasks:completedTasks+overDueTasks+penddingTasks,
	  completedTasks,
	  overDueTasks,
	  projects,
	  // token:req.csrfToken(true)
	}
  }
}
