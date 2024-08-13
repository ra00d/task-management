import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/auth.guard';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'main/users/dto/createUser.dto';
import { User } from './entities/user.entity';
import { DB } from 'common/constants/database.constants';
import { EntityManager } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,@Inject(DB) private db:EntityManager) {}

  @Get('logout')
  // @Public()
  logout(@Req() request: Request): Promise<any> {
    return this.authService.logout(request);
  }

  @UseGuards(LocalGuard)
  @Public()
  @Post('login')
  login(@Req() request: Request) {
    return {...request.user,token:request.csrfToken()};
  }
  @Post('reg-admin')
  register(): Promise<any> {
    return this.authService.register();
  }

  @Post('sign-up')
  @Public()
  async signUp(@Body() body:CreateUserDto){
	const user= this.db.create(User,{
	  email:body.email,
	  password:body.password,
	  name:body.name,
	  role:"USER",
	  active:true
	  
	});

	return await this.db.save(user)
 
  }
}
