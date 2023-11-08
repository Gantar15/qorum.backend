import { Role, Sex } from '@qorum.backend/entities';

export namespace AccountRegister {
  export const topic = 'account.register.command';

  export class Request {
    email: string;
    name: string;
    role: Role;
    bio: string;
    photo: string;
    sex: Sex;
    password: string;
  }

  export class Response {
    id: number;
    email: string;
  }
}
