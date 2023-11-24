import { IsBoolean, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export namespace AccountValidateRefreshToken {
  export const topic = 'account.validate-refresh-token.query';

  export class Request {
    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsString()
    refreshToken: string;
  }

  export class Response {
    @ApiProperty()
    @IsBoolean()
    isValid: boolean;
  }
}
