import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role, Sex } from '@qorum.backend/entities';

import { ApiProperty } from '@nestjs/swagger';

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
