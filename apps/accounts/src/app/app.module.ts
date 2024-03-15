import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskEntity, UserEntity } from '@diary-app/shared-api';
import { UserModule } from '@diary-app/user';
import { AuthModule } from '@diary-app/auth-api';




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
      entities: [UserEntity, TaskEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
