import { compare, genSalt, hash } from 'bcrypt';

export interface IProfile {
  bio: string;
  photo: string;
  sex: Sex;
}

export interface IUserEntity {
  id?: number;
  email: string;
  name: string;
  role: Role;
  passwordHash?: string;
  profile: IProfile;
}

export interface IUserEntityWithId extends IUserEntity {
  id: number;
}

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

export const Role = {
  USER: 'USER',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const Sex = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;
export type Sex = (typeof Sex)[keyof typeof Sex];
