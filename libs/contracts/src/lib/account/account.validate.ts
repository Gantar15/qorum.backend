import { IsBoolean, IsEmail, IsString } from 'class-validator';

export namespace AccountValidate {
  export const topic = 'account.validate.query';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
  }

  export class Response {
    @IsBoolean()
    isValid: boolean;
  }
}
