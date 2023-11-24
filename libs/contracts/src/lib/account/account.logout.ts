import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export namespace AccountLogout {
  export const topic = 'account.logout.command';

  export class Request {
    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsString()
    refreshToken: string;
  }

  export type Response = void;
}
