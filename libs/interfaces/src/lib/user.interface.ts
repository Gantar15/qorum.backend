import { Role, Sex } from '@qorum.backend/entities';

export interface IUserEntity {
  id?: number;
  email: string;
  name: string;
  role: Role;
  bio: string;
  photo: string;
  sex: Sex;
  passwordHash?: string;
}
