import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from '@/app.module';

async function bootstrap() {
  // https://docs.nestjs.com/techniques/logger
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`http://localhost:3000/graphql`);
}
bootstrap();
