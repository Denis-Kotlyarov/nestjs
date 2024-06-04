/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

export enum postStatusEnum {
    DRAW='Черновик',
    PUBLISHED='Опубликованно',
    DELETED='Снято с публикации'
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(type => Category, category => category.posts, { eager: true })
  category: Category

  @Column({
    type: 'enum',
    enum: postStatusEnum,
    default: postStatusEnum.DRAW
  })
  status: postStatusEnum

  @Column({
    type: 'datetime'
  })
  changed_at: Date
}
