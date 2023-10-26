import {
  ALREADY_REGISTERED_USER_ERROR,
  WRONG_CREDENTIALS,
} from '../auth.constants';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { IUserRepository } from '../../user/repositories/user.repository.interface';
import { RegisterDto } from '../auth.controller';
import { UserEntity } from '@qorum.backend/entities';

@Injectable()
export class RegisterUseCases {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(dto: RegisterDto) {
    const oldUser = this.userRepository.findUserByEmail(dto.email);
    if (oldUser) {
      throw new ConflictException(ALREADY_REGISTERED_USER_ERROR);
    }
    const userEntity = await new UserEntity(dto).setPassword(dto.password);
    const newUser = await this.userRepository.createUser(userEntity);
    return { id: newUser.id, email: newUser.email };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email, {
      profile: true,
    });
    if (!user) {
      throw new UnauthorizedException(WRONG_CREDENTIALS);
    }
    const userEntity = new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_CREDENTIALS);
    }
    return {
      id: user.id,
    };
  }
}
