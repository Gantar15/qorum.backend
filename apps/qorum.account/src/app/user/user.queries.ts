import { Body, Controller, Inject } from '@nestjs/common';
import { AccountUserInfo } from '@qorum.backend/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { IUserRepository } from './repositories/user.repository.interface';

@Controller()
export class UserQueries {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository
  ) {}

  @RMQValidate()
  @RMQRoute(AccountUserInfo.topic)
  async userInfo(
    @Body() { id }: AccountUserInfo.Request
  ): Promise<AccountUserInfo.Response> {
    const user = await this.userRepository.findUserById(id);
    return {
      user: user,
    };
  }
}
