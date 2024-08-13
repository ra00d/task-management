import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth } from 'auth/decorators/auth.decorator';
import { AuthUser } from 'auth/decorators/user.decorator';
import { User } from 'auth/entities/user.entity';

@Controller('tasks')
@Auth('ADMIN','USER')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto,) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@AuthUser() user:User) {
    return this.tasksService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
  @Patch(':id/complete')
  complete(@Param('id') id: string){
	return this.tasksService.makeTaskCompleted(+id)
  }
}
