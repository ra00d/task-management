import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthUser } from 'auth/decorators/user.decorator';
import { User } from 'auth/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto,@AuthUser() user:User) {

	
    return this.projectsService.create(createProjectDto,user);
  }

  @Get()
  findAll(@AuthUser() user:User) {
	
    return this.projectsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@AuthUser() user:User) {
    return this.projectsService.findOne(+id,user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto,@AuthUser() user:User) {
    return this.projectsService.update(+id, updateProjectDto,user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
