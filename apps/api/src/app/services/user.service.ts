import { AccountGetUserById } from '@qorum.backend/contracts';
import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class UserService {
  constructor(private readonly rmqService: RMQService) {}

  async getUserById(id: number) {
    return await this.rmqService.send<
      AccountGetUserById.Request,
      AccountGetUserById.Response
    >(AccountGetUserById.topic, { id });
  }
}
