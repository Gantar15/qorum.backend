import { CategoryEntity } from '../../category/entities/category.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { LikeEntity } from '../../like/entities/like.entity';
import { TagEntity } from '../../tag/entities/tag.entity';

export class PostEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  images: string[];
  published: boolean;
  categories: CategoryEntity[];
  comments: CommentEntity[];
  likes: LikeEntity[];
  tags: TagEntity[];
}
