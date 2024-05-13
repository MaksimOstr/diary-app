/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser'
import { Logger, ValidationPipe } from '@nestjs/common';
import { server } from 'globalShared'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


server.listen()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()).enableCors({
    credentials: true,
    origin: 'http://localhost:4200'
  }),
  app.useGlobalPipes(new ValidationPipe())
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('Diary')
    .setDescription('The Diary API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
