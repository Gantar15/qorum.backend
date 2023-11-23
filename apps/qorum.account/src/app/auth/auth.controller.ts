import { Body, Controller } from '@nestjs/common';
import { RegisterUseCases } from './usecases/register.usecases';
import { LoginUseCases } from './usecases/login.usecases';
import {
  AccountLogin,
  AccountRegister,
  AccountValidate,
} from '@qorum.backend/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCases: RegisterUseCases,
    private readonly loginUseCases: LoginUseCases
  ) {}

  @RMQValidate()
  @RMQRoute(AccountRegister.topic)
  async register(
    @Body() dto: AccountRegister.Request
  ): Promise<AccountRegister.Response> {
    return this.registerUseCases.register(dto);
  }

  @RMQValidate()
  @RMQRoute(AccountLogin.topic)
  async login(
    @Body() dto: AccountLogin.Request
  ): Promise<AccountLogin.Response> {
    const { id } = await this.loginUseCases.validateUser(
      dto.email,
      dto.password
    );
    return this.loginUseCases.login(id);
  }

  @RMQValidate()
  @RMQRoute(AccountValidate.topic)
  async validateUser(
    @Body() dto: AccountValidate.Request
  ): Promise<AccountValidate.Response> {
    try {
      await this.loginUseCases.validateUser(dto.email, dto.password);
    } catch (err) {
      return { isValid: false };
    }

    return { isValid: true };
  }
}
