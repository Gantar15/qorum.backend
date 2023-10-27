import { IUserEntity } from '@qorum.backend/entities';

export interface IUserRepository {
  createUser(user: IUserEntity): Promise<Partial<IUserEntity>>;
  findUserByEmail<T>(email: string, aggregate?: T): Promise<IUserEntity | null>;
  deleteUserByEmail(email: string): Promise<Partial<IUserEntity>>;
}

export const IUserRepository = Symbol('IUserRepository');
