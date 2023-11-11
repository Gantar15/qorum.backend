import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCases } from './usecases/login.usecases';
import { Module } from '@nestjs/common';
import { RegisterUseCases } from './usecases/register.usecases';
import { UserModule } from '../user/user.module';
import { getJwtConfig } from '../configs/jwt.config';

@Module({
  imports: [UserModule, JwtModule.registerAsync(getJwtConfig())],
  controllers: [AuthController],
  providers: [RegisterUseCases, LoginUseCases],
})
export class AuthModule {}
