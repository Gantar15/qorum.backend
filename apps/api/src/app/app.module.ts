import * as Joi from '@hapi/joi';

import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { getJwtConfig } from './configs/jwt.config';
import { getRMQConfig } from './configs/rmq.config';

@Module({
  imports: [
    RMQModule.forRootAsync(getRMQConfig()),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/api.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        RMQ_EXCHANGE_NAME: Joi.string().required(),
        RMQ_LOGIN: Joi.string().required(),
        RMQ_PASSWORD: Joi.string().required(),
        RMQ_HOST: Joi.string().required(),
      }),
    }),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
