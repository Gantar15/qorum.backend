import { IProfile } from './profile.interface';
import { Role } from '@qorum.backend/entities';

export interface IUserEntity {
  email: string;
  name: string;
  role: Role;
  passwordHash?: string;
  profile: IProfile;
}

export interface IUserEntityWithId extends IUserEntity {
  id: number;
}
