import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../user/repositories/user.repository.interface';
import { WRONG_CREDENTIALS } from '../auth.constants';
import { UserEntity } from '@qorum.backend/entities';

@Injectable()
export class LoginUseCases {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository
  ) {}

  async login(id: number) {
    const access_token = await this.jwtService.signAsync({ id });
    return {
      access_token,
    };
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
      id: user.id,
    };
  }
}
