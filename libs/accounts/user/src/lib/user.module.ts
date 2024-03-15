import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from '@diary-app/shared-api';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserService],
  exports: [],
})
export class UserModule { }
