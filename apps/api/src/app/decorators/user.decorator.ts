import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { IJWTPayload } from '@qorum.backend/interfaces';

export const UseId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJWTPayload => {
    return ctx.switchToHttp().getRequest()?.user;
  }
);
