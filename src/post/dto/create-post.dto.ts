// eslint-disable-next-line prettier/prettier
import { Category } from 'src/category/entities/category.entity';
import { postStatusEnum } from '../entities/post.entity';

export class CreatePostDto {
  title: string;
  body: string;
  category: Category;
  status: postStatusEnum;
  changed_at: Date;
}
