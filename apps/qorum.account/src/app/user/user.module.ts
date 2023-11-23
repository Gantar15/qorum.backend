import { IUserRepository } from './repositories/user.repository.interface';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@qorum.backend/database';
import { UserCommands } from './user.commands';
import { UserQueries } from './user.queries';
import { UserRepository } from './repositories/user.repository';
import { UserUseCases } from './usecases/user.usecases';

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: IUserRepository, useClass: UserRepository },
    UserUseCases,
  ],
  exports: [IUserRepository],
  controllers: [UserCommands, UserQueries],
})
export class UserModule {}
