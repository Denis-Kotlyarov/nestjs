// eslint-disable-next-line prettier/prettier
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { postStatusEnum } from '../entities/post.entity';
import * as Joi from 'joi';

export class CreatePostDto {
  @ApiProperty({
    description: 'Название статьи',
  })
  title: string;

  @ApiProperty({
    description: 'Тело статьи',
  })
  body: string;

  @ApiProperty({
    description: 'Категории',
    type: [Category],
    required: false,
  })
  category: object[];

  @ApiProperty({
    description: 'Автор',
  })
  author: User;

  @ApiProperty({
    description: 'Статус поста',
    enum: ['Черновик', 'Опубликованно', 'Снято с публикации'],
  })
  status: postStatusEnum;

  @ApiProperty({
    description: 'Дата изменения',
  })
  changed_at: Date;
}

export const CreatePostSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.array(),
  author: Joi.object().required(),
  status: Joi.string().required(),
  changed_at: Joi.date(),
});
