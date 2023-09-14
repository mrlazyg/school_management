import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.APP_PORT || 3001;

async function bootstrap() {
  const logger = new Logger('AppModule');
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  logger.log(`App is listening to ${PORT}`, await app.getUrl());
}
bootstrap();
