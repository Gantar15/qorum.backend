import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../user/repositories/user.repository.interface';
import { DENY_ACCESS, WRONG_CREDENTIALS } from '../auth.constants';
import { UserEntity, UserTokenEntity } from '@qorum.backend/entities';
import { IAuthRepository } from '../repositories/auth.repository.interface';
import { IJWTPayload } from '@qorum.backend/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginUseCases {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    @Inject(IAuthRepository) private readonly authRepository: IAuthRepository
  ) {}

  async login(userId: number) {
    const access_token = await this.signAccessToken({ id: userId });
    const refresh_token = await this.signRefreshToken({ id: userId });
    const refreshTokenEntity = new UserTokenEntity();
    await refreshTokenEntity.setToken(refresh_token);
    await this.authRepository.addToken(userId, refreshTokenEntity);
    return {
      access_token,
      refresh_token,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const payload = this.jwtService.decode(refreshToken) as IJWTPayload;
    const tokenResponse = this.validateRefreshToken(refreshToken, payload.id);

    if (!tokenResponse) {
      throw new ForbiddenException(DENY_ACCESS);
    }
    const access_token = this.signAccessToken({ id: payload.id });
    return access_token;
  }

  async validateRefreshToken(refreshToken: string, userId: number) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });
    } catch (err) {
      throw new ForbiddenException(DENY_ACCESS);
    }
    const refreshTokenEntity = new UserTokenEntity();
    await refreshTokenEntity.setToken(refreshToken);
    const tokenResponse = await this.authRepository.getToken(
      userId,
      refreshTokenEntity
    );
    return tokenResponse;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(WRONG_CREDENTIALS);
    }
    const userEntity = new UserEntity(user);
    const isCurrectPassword = await userEntity.validatePassword(password);

    if (!isCurrectPassword) {
      throw new UnauthorizedException(WRONG_CREDENTIALS);
    }
    return {
      userId: user.id,
    };
  }

  async signAccessToken(payload: IJWTPayload) {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
      )}s`,
    });

    return access_token;
  }

  async signRefreshToken(payload: IJWTPayload) {
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
      )}s`,
    });

    return refresh_token;
  }
}
