import { ALREADY_REGISTERED_USER_ERROR } from '../auth.constants';
import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { IUserRepository } from '../../user/repositories/user.repository.interface';
import { UserEntity } from '@qorum.backend/entities';
import { AccountRegister } from '@qorum.backend/contracts';

@Injectable()
export class RegisterUseCases {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository
  ) {}

  async register(dto: AccountRegister.Request) {
    const oldUser = await this.userRepository.findUserByEmail(dto.email);
    if (oldUser) {
      throw new ConflictException(ALREADY_REGISTERED_USER_ERROR);
    }
    const userEntity = await new UserEntity(dto).setPassword(dto.password);
    const newUser = await this.userRepository.createUser(userEntity);
    return { id: newUser.id, email: newUser.email };
  }
}
