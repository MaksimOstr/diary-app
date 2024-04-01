import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '@diary-app/user';
import { options } from 'shared-backend';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/role.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [PassportModule, JwtModule.registerAsync(options()), UserModule],
  exports: [],
})
export class AuthModule { }
