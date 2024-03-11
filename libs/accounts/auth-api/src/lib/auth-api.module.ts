import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './model/account.entity';


@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([Account])
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthApiModule { }
