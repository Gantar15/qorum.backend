import { Body, Controller } from '@nestjs/common';
import { RegisterUseCases } from './usecases/register.usecases';
import { LoginUseCases } from './usecases/login.usecases';
import { AccountLogin, AccountRegister } from '@qorum.backend/contracts';
import { RMQRoute } from 'nestjs-rmq';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCases: RegisterUseCases,
    private readonly loginUseCases: LoginUseCases
  ) {}

  @RMQRoute(AccountRegister.topic)
  async register(
    @Body() dto: AccountRegister.Request
  ): Promise<AccountRegister.Response> {
    return this.registerUseCases.register(dto);
  }

  @RMQRoute(AccountLogin.topic)
  async login(
    @Body() dto: AccountLogin.Request
  ): Promise<AccountLogin.Response> {
    const { id } = await this.registerUseCases.validateUser(
      dto.email,
      dto.password
    );
    return this.loginUseCases.login(id);
  }
}
