import { IUserTokenEntity } from '@qorum.backend/entities';

export interface IAuthRepository {
  addToken(userId: number, token: IUserTokenEntity): Promise<IUserTokenEntity>;
  removeToken(
    userId: number,
    token: IUserTokenEntity
  ): Promise<IUserTokenEntity>;
  getToken(
    userId: number,
    token: IUserTokenEntity
  ): Promise<IUserTokenEntity | null>;
}

export const IAuthRepository = Symbol('IAuthRepository');
