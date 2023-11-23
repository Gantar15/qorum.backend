import { Body, Controller, Get } from '@nestjs/common';

import { AccountGetUserById } from '@qorum.backend/contracts';
import { ApiTags } from '@nestjs/swagger';
import { RMQService } from 'nestjs-rmq';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('get-info')
  async getInfo(@Body() { id }: { id: number }) {
    return this.rmqService.send<
      AccountGetUserById.Request,
      AccountGetUserById.Response
    >(AccountGetUserById.topic, { id });
  }
}
