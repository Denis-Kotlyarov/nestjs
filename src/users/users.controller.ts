import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common'; //UseGuards, Request, Post,
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from 'src/auth/auth.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { User as userEntity } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'Получены все пользователи',
    type: userEntity,
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 302,
    description: 'Поиск пользователя по email успешен',
    type: userEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователся с этим email не существует',
  })
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно обновлен',
    type: userEntity,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно удален',
    type: userEntity,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
