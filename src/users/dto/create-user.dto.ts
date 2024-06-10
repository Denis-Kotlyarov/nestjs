import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя',
  })
  first_name: string;

  @ApiProperty({
    description: 'Фамилия',
  })
  last_name: string;

  @ApiProperty({
    description: 'Почта',
  })
  email: string;

  @ApiProperty({
    description: 'Пароль',
  })
  password: string;
}

export const CreateUserSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});
