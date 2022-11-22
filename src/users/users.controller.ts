import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginConfirmUserDto } from './dto/login-confirm-user.dto';
import { Auth } from '../auth/auth.decorator';
import { User, UserEntity } from '../auth/user.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Login')
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @ApiTags('Login')
  @Post('/login/confirm')
  loginConfirm(@Body() loginConfirmUserDto: LoginConfirmUserDto) {
    return this.usersService.loginConfirm(loginConfirmUserDto);
  }

  @ApiTags('User')
  @Get()
  @Auth()
  // TODO: Block list users from user no admin
  findAll() {
    return this.usersService.findAll();
  }

  @ApiTags('User')
  @Get('me')
  @Auth()
  findMe(@User() user: UserEntity) {
    return this.usersService.findOne(user.id);
  }

  @ApiTags('User')
  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
