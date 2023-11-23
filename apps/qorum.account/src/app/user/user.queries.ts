import { Body, Controller, Inject } from '@nestjs/common';
import { AccountGetUserById } from '@qorum.backend/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { IUserRepository } from './repositories/user.repository.interface';

@Controller()
export class UserQueries {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository
  ) {}

  @RMQValidate()
  @RMQRoute(AccountGetUserById.topic)
  async getUserById(
    @Body() { id }: AccountGetUserById.Request
  ): Promise<AccountGetUserById.Response> {
    const user = await this.userRepository.findUserById(id);
    return user;
  }
}
