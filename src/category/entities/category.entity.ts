/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
// import { IsString } from 'class-validator';

@Entity()
export class Category {
  @ApiProperty({
    description: 'автоматическое ID',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Имя категории',
  })
  // @IsString()
  @Column()
  name: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
