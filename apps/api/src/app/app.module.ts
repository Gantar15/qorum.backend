import * as Joi from '@hapi/joi';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { getJwtConfig } from './configs/jwt.config';
import { getRMQConfig } from './configs/rmq.config';

@Module({
  imports: [
    RMQModule.forRootAsync(getRMQConfig()),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/api.env',
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().required(),
        RMQ_EXCHANGE_NAME: Joi.string().required(),
        RMQ_LOGIN: Joi.string().required(),
        RMQ_PASSWORD: Joi.string().required(),
        RMQ_HOST: Joi.string().required(),
      }),
    }),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
