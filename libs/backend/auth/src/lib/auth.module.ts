import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '@diary-app/user';
import { options } from 'shared-backend';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PassportModule, JwtModule.registerAsync(options()), UserModule],
  exports: [],
})
export class AuthModule { }
