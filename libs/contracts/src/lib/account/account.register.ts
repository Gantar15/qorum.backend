import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Role, Sex } from '@qorum.backend/entities';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  class Profile {
    @ApiProperty({ enum: Sex })
    @IsEnum(Sex)
    sex: Sex;

    @ApiProperty()
    @IsString()
    bio: string;

    @ApiProperty()
    @IsString()
    photo: string;
  }

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
    password: string;

    @ApiProperty()
    @ValidateNested()
    @Type(() => Profile)
    profile: Profile;
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
