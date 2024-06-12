import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import * as Joi from 'joi';

export class CreateFileDto {
  @ApiProperty({
    description: 'Имя файла',
  })
  @IsString()
  @IsNotEmpty()
  filename: string;
  @ApiProperty({
    description: 'MIME тип файла',
  })
  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @ApiProperty({
    description: 'Данные файла в виде буфера',
  })
  data: Buffer;
}

export const CreateFileSchema = Joi.object({
  filename: Joi.string(),
  mimetype: Joi.string(),
  data: Joi.binary(),
}).unknown(true);
