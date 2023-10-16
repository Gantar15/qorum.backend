import { Module } from '@nestjs/common';
import { PrismaModule } from '@qorum.backend/database';

@Module({
  imports: [PrismaModule],
  providers: [PrismaModule],
})
export class UserModule {}
