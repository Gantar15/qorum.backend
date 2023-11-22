import { IUserEntity } from '@qorum.backend/interfaces';
import { IUserRepository } from './user.repository.interface';
import { Injectable } from '@nestjs/common';
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

  async findUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      // include: {
      //   profile: true,
      // },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
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

  async findUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      // include: {
      //   ...populate,
      //   profile: true,
      // },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
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
