import { ApiProperty } from '@nestjs/swagger';
import { IUserEntity } from '@qorum.backend/interfaces';
import { IsNumber } from 'class-validator';

export namespace AccountUserInfo {
  export const topic = 'account.user-info.command';

  export class Request {
    @ApiProperty()
    @IsNumber()
    id: number;
  }

  export class Response {
    @ApiProperty()
    user: Omit<IUserEntity, 'passwordHash'>;
  }
}
