import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserEntity {
  id: string;
  email: string;
}

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as UserEntity;
  },
);
