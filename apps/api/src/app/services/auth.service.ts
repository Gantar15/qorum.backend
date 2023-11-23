import { AccountLogin, AccountValidate } from '@qorum.backend/contracts';

import { ACCESS_TOKEN_NAME } from '../constants/jwt.constants';
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
    const { access_token } = await this.rmqService.send<
      AccountLogin.Request,
      AccountLogin.Response
    >(AccountLogin.topic, dto);

    sendCookie(
      res,
      ACCESS_TOKEN_NAME,
      access_token,
      this.configService.get('JWT_EXPIRATION_TIME')
    );

    return access_token;
  }

  async logout(res: Response, id: number) {
    deleteCookie(res, ACCESS_TOKEN_NAME);
    return;
  }
}
