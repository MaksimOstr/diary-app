import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account, AuthApiModule } from '@diary-app/auth-api';
import { AccountsController } from './accounts/accounts.controller';
import { AuthService } from 'libs/accounts/auth-api/src/lib/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5440,
      username: 'admin',
      password: 'masterkey',
      database: 'diary',
      entities: [Account],
      synchronize: true,
    }),
    AuthApiModule
  ],
  controllers: [AppController, AccountsController],
  providers: [AppService],
})
export class AppModule { }
