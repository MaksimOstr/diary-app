import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, jwtConfig } from '@diary-app/shared-api';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: jwtConfig.token.secret,
      signOptions: {
        expiresIn: jwtConfig.token.expiresIn
      }
    })
  ],
  providers: [AuthService],
  exports: [],
})
export class AuthModule { }
