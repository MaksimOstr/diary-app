import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
