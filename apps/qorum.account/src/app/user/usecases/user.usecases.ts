import { AccountGetUserById } from '@qorum.backend/contracts';
import { IUserRepository } from '../repositories/user.repository.interface';
import { Body, Inject, Injectable } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Injectable()
export class UserUseCases {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository
  ) {}

  @RMQValidate()
  @RMQRoute(AccountGetUserById.topic)
  async getUserById(
    @Body() dto: AccountGetUserById.Request
  ): Promise<AccountGetUserById.Response> {
    const user = await this.userRepository.findUserById(dto.id);

    if (!user) return null;
    return user;
  }
}
