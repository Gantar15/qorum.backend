import { Response } from 'express';

export function deleteCookie(res: Response, name: string) {
  res.cookie(name, '', { maxAge: 0 });
}
