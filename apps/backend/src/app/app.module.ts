import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { UserModule } from '@diary-app/user';
import { PrismaModule } from '@diary-app/prisma';
import { AuthModule, JwtAuthGuard, RolesGuard } from 'auth-api';
import { APP_GUARD } from '@nestjs/core';
import { TaskModule } from '@diary-app/task';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TaskModule
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
