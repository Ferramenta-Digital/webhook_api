import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginConfirmUserDto } from './dto/login-confirm-user.dto';
import { Auth } from '../auth/auth.decorator';
import { User, UserEntity } from '../auth/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('/login/confirm')
  loginConfirm(@Body() loginConfirmUserDto: LoginConfirmUserDto) {
    return this.usersService.loginConfirm(loginConfirmUserDto);
  }

  @Get()
  @Auth()
  // TODO: Block list users from user no admin
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @Auth()
  findMe(@User() user: UserEntity) {
    return this.usersService.findOne(user.id);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
