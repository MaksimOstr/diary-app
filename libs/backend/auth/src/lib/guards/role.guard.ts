import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { ExtractJwt } from 'passport-jwt';
import { ROLES_KEY } from 'shared-backend';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(
      context.switchToHttp().getRequest()
    );
    if(!token) {
      return false
    }

    const user: User = this.jwtService.decode(token);
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}