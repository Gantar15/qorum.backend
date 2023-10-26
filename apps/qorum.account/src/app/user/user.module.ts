import { Module } from '@nestjs/common';
import { PrismaModule } from '@qorum.backend/database';
import { UserRepository } from './repositories/user.repository';
import { UserUseCases } from './usecases/user.usecases';

@Module({
  imports: [PrismaModule],
  providers: [PrismaModule, UserRepository, UserUseCases],
  exports: [UserRepository],
})
export class UserModule {}
