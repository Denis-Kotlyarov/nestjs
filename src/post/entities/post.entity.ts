/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
// import { IsDateString, IsEnum, IsString } from 'class-validator';

export enum postStatusEnum {
  DRAW = 'Черновик',
  PUBLISHED = 'Опубликованно',
  DELETED = 'Снято с публикации',
}

@Entity()
export class Post {
  @ApiProperty({
    description: 'автоматическое ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Название статьи',
  })
  // @IsString()
  @Column()
  title: string;

  @ApiProperty({
    description: 'Тело статьи',
  })
  // @IsString()
  @Column()
  body: string;

  @ApiProperty({
    description: 'Категории',
    required: false,
    type: [Category],
  })
  @ManyToOne(() => Category, (category) => category.posts, { eager: true })
  category: Category[];

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  authorId: User;

  @ApiProperty({
    description: 'Статус поста',
    enum: ['Черновик', 'Опубликованно', 'Снято с публикации'],
  })
  // @IsEnum(postStatusEnum)
  @Column({
    type: 'enum',
    enum: postStatusEnum,
    default: postStatusEnum.DRAW,
  })
  status: postStatusEnum;

  @ApiProperty({
    description: 'Дата изменения',
  })
  // @IsDateString()
  @Column({
    type: 'datetime',
  })
  changed_at: Date;
}
