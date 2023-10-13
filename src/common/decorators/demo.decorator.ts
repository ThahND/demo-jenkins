import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Demo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // code logic here
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
