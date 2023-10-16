import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [PostModule, CategoryModule, TagModule, LikeModule, CommentModule],
})
export class AppModule {}
