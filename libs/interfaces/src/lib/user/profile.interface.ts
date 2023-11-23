import { Sex } from '@qorum.backend/entities';

export interface IProfile {
  bio: string;
  photo: string;
  sex: Sex;
}
