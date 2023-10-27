import { IUserEntity } from '@qorum.backend/entities';
import { IUserRepository } from './user.repository.interface';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@qorum.backend/database';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: IUserEntity) {
    return await this.prismaService.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        passwordHash: user.passwordHash,
        profile: {
          create: { bio: user.bio, photo: user.photo, sex: user.sex },
        },
      },
    });
  }

  async findUserByEmail(email: string, populate?: Prisma.UserInclude) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        ...populate,
        profile: true,
      },
    });

    if (user)
      return {
        ...user,
        bio: user?.profile.bio,
        photo: user?.profile.photo,
        sex: user?.profile.sex,
      };
    else return null;
  }

  async deleteUserByEmail(email: string) {
    return this.prismaService.user.delete({
      where: {
        email,
      },
    });
  }
}
