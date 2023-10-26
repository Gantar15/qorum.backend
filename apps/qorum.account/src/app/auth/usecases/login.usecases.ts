import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCases {
  constructor(private readonly jwtService: JwtService) {}

  async login(id: number) {
    return {
      access_token: this.jwtService.signAsync({ id }),
    };
  }
}
