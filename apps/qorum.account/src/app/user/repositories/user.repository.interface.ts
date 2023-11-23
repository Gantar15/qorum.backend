import { IUserEntity, IUserEntityWithId } from '@qorum.backend/interfaces';

export interface IUserRepository {
  createUser(user: IUserEntity): Promise<IUserEntityWithId>;
  findUserByEmail(email: string): Promise<IUserEntityWithId | null>;
  findUserById(id: number): Promise<IUserEntityWithId | null>;
  deleteUserByEmail(email: string): Promise<IUserEntityWithId | null>;
}

export const IUserRepository = Symbol('IUserRepository');
