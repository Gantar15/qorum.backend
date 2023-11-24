import { IAuthRepository } from './auth.repository.interface';
import { IUserTokenEntity } from '@qorum.backend/entities';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@qorum.backend/database';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async addToken(userId: number, token: IUserTokenEntity) {
    const userToken = await this.prismaService.userToken.create({
      data: { userId, tokenHash: token.tokenHash },
    });

    return userToken;
  }

  async removeToken(userId: number, token: IUserTokenEntity) {
    const deletedToken = await this.prismaService.userToken.delete({
      where: {
        userId,
        tokenHash: token.tokenHash,
      },
    });
    return deletedToken;
  }

  async getToken(userId: number, token: IUserTokenEntity) {
    const userTokens = await this.prismaService.userToken.findUnique({
      where: {
        userId,
        tokenHash: token.tokenHash,
      },
    });
    return userTokens;
  }
}
