import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@qorum.backend/database';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@Inject() private readonly prismaService: PrismaService) {}

  async createUser(user: UserEntity) {
    this.prismaService.user.create({ data: user });
  }
}
