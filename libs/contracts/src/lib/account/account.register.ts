import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { Role, Sex } from '@qorum.backend/entities';

import { ApiProperty } from '@nestjs/swagger';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEnum(Role)
    role: Role;

    @ApiProperty()
    @IsString()
    bio: string;

    @ApiProperty()
    @IsString()
    photo: string;

    @ApiProperty()
    @IsEnum(Sex)
    sex: Sex;

    @ApiProperty()
    @IsString()
    password: string;
  }

  export class Response {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsEmail()
    email: string;
  }
}
