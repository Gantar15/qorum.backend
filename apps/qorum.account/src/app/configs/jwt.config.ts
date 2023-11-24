import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const getJwtConfig = (): JwtModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    signOptions: {
      expiresIn: `${configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    },
    global: true,
  }),
});
