import { IUserRepository } from './repositories/user.repository.interface';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@qorum.backend/database';
import { UserRepository } from './repositories/user.repository';
import { UserUseCases } from './usecases/user.usecases';

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: IUserRepository, useClass: UserRepository },
    UserUseCases,
  ],
  exports: [IUserRepository],
})
export class UserModule {}
