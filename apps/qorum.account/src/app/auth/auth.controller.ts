import { Body, Controller } from '@nestjs/common';
import { RegisterUseCases } from './usecases/register.usecases';
import { LoginUseCases } from './usecases/login.usecases';
import {
  AccountLogin,
  AccountLogout,
  AccountRegister,
  AccountValidate,
  AccountValidateRefreshToken,
} from '@qorum.backend/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { LogoutUseCases } from './usecases/logout.usecases';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCases: RegisterUseCases,
    private readonly loginUseCases: LoginUseCases,
    private readonly logoutUseCases: LogoutUseCases
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
    const { userId } = await this.loginUseCases.validateUser(
      dto.email,
      dto.password
    );
    return this.loginUseCases.login(userId);
  }

  @RMQValidate()
  @RMQRoute(AccountLogout.topic)
  async logout(
    @Body() { userId, refreshToken }: AccountLogout.Request
  ): Promise<AccountLogout.Response> {
    await this.logoutUseCases.logout(userId, refreshToken);
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

  @RMQValidate()
  @RMQRoute(AccountValidateRefreshToken.topic)
  async validateRefreshToken(
    @Body() dto: AccountValidateRefreshToken.Request
  ): Promise<AccountValidateRefreshToken.Response> {
    try {
      await this.loginUseCases.validateRefreshToken(
        dto.refreshToken,
        dto.userId
      );
    } catch (err) {
      return { isValid: false };
    }

    return { isValid: true };
  }
}
