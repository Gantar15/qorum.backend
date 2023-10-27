import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCases {
  constructor(private readonly jwtService: JwtService) {}

  async login(id: number) {
    const access_token = await this.jwtService.signAsync({ id });
    return {
      access_token,
    };
  }
}
