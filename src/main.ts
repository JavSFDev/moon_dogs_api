import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { json } from 'body-parser';
import * as expressBasicAuth from 'express-basic-auth';
import {
  DOC_USER_NAME,
  DOC_USER_PASSWORD,
  WHITE_LIST_DOMAIN,
} from './shared/constants/base.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'dev'
        ? ['log', 'error', 'warn', 'debug', 'verbose']
        : ['log', 'error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '50mb' }));

  const users = {
    [DOC_USER_NAME]: DOC_USER_PASSWORD,
  };
  app.use(
    '/docs',
    expressBasicAuth({
      challenge: true,
      users,
    }),
  );

  app.enableCors({
    origin: WHITE_LIST_DOMAIN,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Moondog-API-Backend')
    .setDescription('Moondog API Backend')
    .setVersion('1.0')
    .addTag('moondog-api-backend')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
