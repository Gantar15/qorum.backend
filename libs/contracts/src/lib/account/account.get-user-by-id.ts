import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Role, Sex } from '@qorum.backend/entities';

import { Type } from 'class-transformer';

export namespace AccountGetUserById {
  export const topic = 'account.get-user-by-id.query';

  class Profile {
    @IsEnum(Sex)
    sex: Sex;

    @IsString()
    bio: string;

    @IsString()
    photo: string;
  }

  export class Request {
    @IsNumber()
    id: number;
  }

  export class ResponseClass {
    @IsNumber()
    id: number;

    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsEnum(Role)
    role: Role;

    @ValidateNested()
    @Type(() => Profile)
    profile: Profile;
  }

  export type Response = ResponseClass | null;
}
