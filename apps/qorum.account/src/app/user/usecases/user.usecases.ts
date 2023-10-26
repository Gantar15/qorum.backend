import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}
}
