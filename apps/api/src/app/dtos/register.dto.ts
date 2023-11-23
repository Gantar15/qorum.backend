import { IsEmail, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Role, Sex } from '@qorum.backend/entities';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Profile {
  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  photo: string;

  @ApiProperty()
  @IsEnum(Sex)
  sex: Sex;
}

export class RegisterDto {
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
