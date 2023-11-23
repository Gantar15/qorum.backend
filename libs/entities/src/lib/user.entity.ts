import { IProfile, IUserEntity } from '@qorum.backend/interfaces';
import { compare, genSalt, hash } from 'bcrypt';

import { Role } from './enums/user.enums';

export class UserEntity implements IUserEntity {
  id?: number;
  email: string;
  name: string;
  role: Role;
  passwordHash?: string;
  profile: IProfile;

  constructor(object: IUserEntity) {
    this.passwordHash = object.passwordHash;
    this.id = object.id;
    this.email = object.email;
    this.name = object.name;
    this.role = object.role;
    this.profile = object.profile;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async validatePassword(password: string) {
    if (!this.passwordHash) return false;
    return compare(password, this.passwordHash);
  }
}
