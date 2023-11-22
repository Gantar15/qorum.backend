import { ConfigModule, ConfigService } from '@nestjs/config';

import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    serviceName: 'qorum.account',
    exchangeName: configService.get('RMQ_EXCHANGE_NAME'),
    prefetchCount: 32,
    connections: [
      {
        login: configService.get('RMQ_LOGIN'),
        password: configService.get('RMQ_PASSWORD'),
        host: configService.get('RMQ_HOST'),
      },
    ],
  }),
});
