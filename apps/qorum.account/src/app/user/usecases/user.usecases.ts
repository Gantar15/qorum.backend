import { IUserRepository } from '../repositories/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserUseCases {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository
  ) {}
}
