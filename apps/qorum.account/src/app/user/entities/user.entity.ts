import { compare, genSalt, hash } from 'bcrypt';

import { CommentEntity } from '../../../../../qorum.post/src/app/comment/entities/comment.entity';
import { LikeEntity } from '../../../../../qorum.post/src/app/like/entities/like.entity';
import { PostEntity } from '../../../../../qorum.post/src/app/post/entities/post.entity';

export enum UserRole {
  USER = 'User',
  MANAGER = 'Manager',
  ADMIN = 'Admin',
}

export enum UserSex {
  MALE = 'Male',
  FEMALE = 'Female',
}

export class UserEntity {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  posts: PostEntity[];
  bio: string;
  photo: string;
  sex: UserSex;
  passwordHash: string;
  comments: CommentEntity[];
  likes: LikeEntity[];

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.posts = user.posts;
    this.bio = user.bio;
    this.photo = user.photo;
    this.sex = user.sex;
    this.comments = user.comments;
    this.likes = user.likes;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }
}
