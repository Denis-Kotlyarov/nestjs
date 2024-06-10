/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsString } from 'class-validator';

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
  // @IsString()
  @Column()
  first_name: string;

  @ApiProperty({
    description: 'Фамилия',
    required: false,
  })
  // @IsString()
  @Column()
  last_name: string;

  @ApiProperty({
    description: 'Почта',
  })
  @Column({
    unique: true,
  })
  // @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Пароль',
  })
  // @IsString()
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.authorId)
  posts: Post[];
}
