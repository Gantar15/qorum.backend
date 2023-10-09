import { Module } from '@nestjs/common';
import { PrismaModule } from '@qorum.backend/database';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaModule],
})
export class UserModule {}
