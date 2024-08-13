import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthUser } from 'auth/decorators/user.decorator';
import { User } from 'auth/entities/user.entity';
import { ProfileService } from './profile.service';
import { SessionGuard } from 'auth/guards/session.guard';

@Controller('me')
@UseGuards(SessionGuard)
export class ProfileController {
  constructor(private readonly profileService:ProfileService){}
@Get()
  getProfile(@AuthUser() user:User){
return this.profileService.getProfile(user.id)
  }
  @Get('taks')
  getTasks(@AuthUser() user:User){
	return this.profileService.getTasks(user.id)
  }
}
