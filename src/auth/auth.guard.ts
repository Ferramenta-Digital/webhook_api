import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request?.headers?.authorization;

    if (!authHeader) return false;

    const parts = authHeader.split(' ');

    if (parts.length !== 2) return false;

    const [scheme, token] = parts;

    if (!/Bearer$/i.test(scheme)) return false;
    try {
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as any;

      request.user = {
        id: tokenDecoded.userId,
        email: tokenDecoded.userEmail,
      };

      return request.user;
    } catch (error) {
      return false;
    }
  }
}
