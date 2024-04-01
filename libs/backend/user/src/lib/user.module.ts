import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CacheModule } from '@nestjs/cache-manager'
import { APP_GUARD } from '@nestjs/core';




@Module({
  controllers: [UserController],
  providers: [
    UserService
  ],
  imports: [CacheModule.register()],
  exports: [UserService],
})
export class UserModule { }
