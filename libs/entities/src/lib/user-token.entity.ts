import { compare, genSalt, hash } from 'bcrypt';

export interface IUserTokenEntity {
  tokenHash: string;
}

export class UserTokenEntity {
  tokenHash: string;

  public async setToken(token: string) {
    const salt = await genSalt(10);
    this.tokenHash = await hash(token, salt);
    return this;
  }

  public async validateToken(token: string) {
    if (!this.tokenHash) return false;
    return compare(token, this.tokenHash);
  }
}
