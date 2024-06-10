import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto, CreateUserSchema } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from './pipe/validation.pipe';

import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно создан',
    type: CreateUserDto,
  })
  @UsePipes(new ValidationPipe(CreateUserSchema))
  @Post('auth/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Пользователь вошел',
    type: CreateUserDto,
  })
  @UseGuards(AuthGuard('local'))
  @UsePipes(new ValidationPipe(CreateUserSchema))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
