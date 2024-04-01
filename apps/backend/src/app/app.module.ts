import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { UserModule } from '@diary-app/user';
import { PrismaModule } from '@diary-app/prisma';
import { AuthModule, JwtAuthGuard, RolesGuard } from 'auth-api';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
  ],
})
export class AppModule { }
