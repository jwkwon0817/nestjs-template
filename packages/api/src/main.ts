import { AppModule } from '@app/app.module';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import packageJson from '@/../package.json';
import {
  applyBodyLimit,
  applyCors,
  applyGlobalEnhancements,
  applyRedisFlush,
  applySwagger,
} from '@/app/lib';
import { getEnvironment } from './common/utils';

import '@common/lib/sentry/instrument';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('bootstrap');

  app.setGlobalPrefix('api');

  // Apply ValidationPipe FIRST before anything else
  app.useGlobalPipes(new ValidationPipe({
    transform:            true,
    whitelist:            true,
    forbidNonWhitelisted: true,
    transformOptions:     { enableImplicitConversion: false },
    exceptionFactory:     errors => {
      const messages = errors.map(err => `${err.property} - ${Object.values(err.constraints ?? {}).join(', ')}`);

      return new BadRequestException(messages);
    },
  }));

  logger.log('✅ ValidationPipe registered in main.ts');

  applyBodyLimit(app, '1mb');

  applyCors(app, [configService.get<string>('CORS_ORIGIN') ?? '*']);

  applyGlobalEnhancements(app);

  applyRedisFlush(app);

  applySwagger(app);

  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');

  logger.log(`Application version ${packageJson.version} is running on: ${await app.getUrl()}`);

  logger.debug(`Environment: ${getEnvironment()}`);
}

bootstrap();
