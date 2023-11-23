import { IJWTPayload } from './auth.interface';

export interface IUserMixin {
  user: IJWTPayload;
}
