import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { Auth } from "auth/decorators/auth.decorator";

@Controller("users")
@Auth('ADMIN')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
	@Get()
	async findAll() {
		return this.usersService.getAllUsers();
	}
  @Post()
  async create(@Body()body:CreateUserDto){
	return await this.usersService.create(body)
  }
	@Get(':id')
	async findOne(@Param('id') id:string) {
		return this.usersService.findOne(+id);
	}
  @Delete(':id')
  deleteUser(@Param('id')id:string){
	return this.usersService.deleteUser(+id)
  }
 
}
