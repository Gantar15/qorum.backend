import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUseCases } from './usecases/register.usecases';
import { Sex, Role } from '@qorum.backend/entities';
import { LoginUseCases } from './usecases/login.usecases';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCases: RegisterUseCases,
    private readonly loginUseCases: LoginUseCases
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.registerUseCases.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const { id } = await this.registerUseCases.validateUser(
      dto.email,
      dto.password
    );
    return this.loginUseCases.login(id);
  }
}

export class RegisterDto {
  email: string;
  name: string;
  role: Role;
  bio: string;
  photo: string;
  sex: Sex;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}
