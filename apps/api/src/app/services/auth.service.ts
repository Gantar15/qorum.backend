import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_NEY,
} from '../constants/jwt.constants';
import {
  AccountLogin,
  AccountLogout,
  AccountValidate,
  AccountValidateRefreshToken,
} from '@qorum.backend/contracts';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { RMQService } from 'nestjs-rmq';
import { Response } from 'express';
import { ValidateDto } from '../dtos/validate.dto';
import { deleteCookie } from '../utils/deleteCookie';
import { sendCookie } from '../utils/sendCookie';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly rmqService: RMQService
  ) {}

  async validateUser(dto: ValidateDto) {
    return await this.rmqService.send<
      AccountValidate.Request,
      AccountValidate.Response
    >(AccountValidate.topic, dto);
  }

  async login(res: Response, dto: LoginDto) {
    const { access_token, refresh_token } = await this.rmqService.send<
      AccountLogin.Request,
      AccountLogin.Response
    >(AccountLogin.topic, dto);

    sendCookie(
      res,
      ACCESS_TOKEN_KEY,
      access_token,
      this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')
    );

    sendCookie(
      res,
      REFRESH_TOKEN_NEY,
      refresh_token,
      this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')
    );

    return access_token;
  }

  async logout(res: Response, userId: number) {
    await this.rmqService.send<AccountLogout.Request, AccountLogout.Response>(
      AccountLogout.topic,
      { userId }
    );

    deleteCookie(res, ACCESS_TOKEN_KEY);
    return;
  }

  async validateRefreshToken(refreshToken: string, userId: number) {
    return await this.rmqService.send<
      AccountValidateRefreshToken.Request,
      AccountValidateRefreshToken.Response
    >(AccountValidateRefreshToken.topic, { refreshToken, userId });
  }
}
