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
        email: user.email,
        name: user.name,
        role: user.role,
        passwordHash: user.passwordHash,
        profile: {
          create: user.profile,
        },
      },
      include: {
        profile: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profile: true,
      },
    });

    if (user) return user;
    else return null;
  }

  async findUserById(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profile: true,
      },
    });

    if (user) return user;
    else return null;
  }

  async deleteUserByEmail(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user) return null;
    await this.prismaService.user.delete({
      where: {
        email,
      },
      include: {
        profile: true,
      },
    });
    return user;
  }
}
