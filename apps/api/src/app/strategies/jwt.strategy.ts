import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { ACCESS_TOKEN_KEY } from '../constants/jwt.constants';
import { IJWTPayload } from '@qorum.backend/interfaces';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { USER_WAS_NOT_FOUND } from '../constants/error.constants';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  static extractJWT(request: Request) {
    return request?.cookies?.[ACCESS_TOKEN_KEY];
  }

  async validate({ id }: IJWTPayload) {
    const user = await this.userService.getUserById(id);

    if (!user) throw new ForbiddenException(USER_WAS_NOT_FOUND);
    return { id };
  }
}
