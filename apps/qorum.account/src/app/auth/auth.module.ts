import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RegisterUseCases } from './usecases/register.usecases';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/repositories/user.repository';
import { getJwtConfig } from './configs/jwt.config';

@Module({
  imports: [UserModule, JwtModule.registerAsync(getJwtConfig())],
  controllers: [AuthController],
  providers: [RegisterUseCases, UserRepository],
})
export class AuthModule {}
