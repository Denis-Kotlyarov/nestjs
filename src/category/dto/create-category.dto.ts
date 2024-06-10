/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Имя категории',
  })
  name: string;
}

export const CreateCategorySchema = Joi.object({
  name: Joi.string().required(),
});
