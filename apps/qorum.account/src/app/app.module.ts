import * as Joi from '@hapi/joi';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { RMQModule } from 'nestjs-rmq';
import { UserModule } from './user/user.module';
import { getRMQConfig } from './configs/rmq.config';

@Module({
  imports: [
    RMQModule.forRootAsync(getRMQConfig()),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/account.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        RMQ_EXCHANGE_NAME: Joi.string().required(),
        RMQ_QUEUE_NAME: Joi.string().required(),
        RMQ_LOGIN: Joi.string().required(),
        RMQ_PASSWORD: Joi.string().required(),
        RMQ_HOST: Joi.string().required(),
      }),
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
