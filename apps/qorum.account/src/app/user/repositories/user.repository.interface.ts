import { IUserEntity } from '@qorum.backend/interfaces';

export interface IUserRepository {
  createUser(user: IUserEntity): Promise<Partial<IUserEntity>>;
  findUserByEmail(email: string): Promise<IUserEntity | null>;
  findUserById(id: number): Promise<IUserEntity | null>;
  deleteUserByEmail(email: string): Promise<Partial<IUserEntity>>;
}

export const IUserRepository = Symbol('IUserRepository');
