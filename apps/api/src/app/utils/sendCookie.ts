import { Response } from 'express';

export function sendCookie(
  res: Response,
  name: string,
  value: string,
  maxAge: number,
  httpOnly = true,
  path = '/'
) {
  res.cookie(name, value, {
    httpOnly: httpOnly,
    path: path,
    maxAge: maxAge,
  });
}
