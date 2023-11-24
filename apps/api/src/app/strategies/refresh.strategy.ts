import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';
import { DENY_ACCESS } from '../constants/error.constants';
import { IJWTPayload } from '@qorum.backend/interfaces';
import { PassportStrategy } from '@nestjs/passport';
import { REFRESH_TOKEN_NEY } from '../constants/jwt.constants';
import { Request } from 'express';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh'
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.[REFRESH_TOKEN_NEY];
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, { id: userId }: IJWTPayload) {
    const refreshToken = request.cookies?.[REFRESH_TOKEN_NEY];
    const isValidToken = this.authService.validateRefreshToken(
      refreshToken,
      userId
    );
    if (!isValidToken) {
      throw new ForbiddenException(DENY_ACCESS);
    }

    const user = await this.userService.getUserById(userId);
    return user;
  }
}
