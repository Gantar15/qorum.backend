import { AuthController } from './auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { IAuthRepository } from './repositories/auth.repository.interface';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCases } from './usecases/login.usecases';
import { LogoutUseCases } from './usecases/logout.usecases';
import { Module } from '@nestjs/common';
import { RegisterUseCases } from './usecases/register.usecases';
import { UserModule } from '../user/user.module';
import { getJwtConfig } from '../configs/jwt.config';

@Module({
  imports: [UserModule, JwtModule.registerAsync(getJwtConfig())],
  controllers: [AuthController],
  providers: [
    RegisterUseCases,
    LoginUseCases,
    LogoutUseCases,
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
  ],
})
export class AuthModule {}
