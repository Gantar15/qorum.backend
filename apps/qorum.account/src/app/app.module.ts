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
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
