/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    description: 'автоматическое ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Имя',
    required: false,
  })
  @Column()
  first_name: string;

  @ApiProperty({
    description: 'Фамилия',
    required: false,
  })
  @Column()
  last_name: string;

  @ApiProperty({
    description: 'Почта',
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'Пароль',
  })
  @Column()
  password: string;

  @OneToMany((type) => Post, (post) => post.authorId)
  posts: Post[];
}
