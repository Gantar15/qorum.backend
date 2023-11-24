import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from '../repositories/auth.repository.interface';
import { UserTokenEntity } from '@qorum.backend/entities';

@Injectable()
export class LogoutUseCases {
  constructor(
    @Inject(IAuthRepository) private readonly authRepository: IAuthRepository
  ) {}

  async logout(userId: number, refreshToken: string) {
    const refreshTokenEntity = new UserTokenEntity();
    await refreshTokenEntity.setToken(refreshToken);
    await this.authRepository.removeToken(userId, refreshTokenEntity);
  }
}
