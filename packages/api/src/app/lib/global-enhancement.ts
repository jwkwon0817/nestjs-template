import { INestApplication } from '@nestjs/common';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';
import { GlobalExceptionFilter, PrismaExceptionFilter } from '@/common/filters';
import { BigintInterceptor, TransformInterceptor } from '@/common/interceptors';

export function applyGlobalEnhancements(app: INestApplication) {
  app.useGlobalFilters(app.get(GlobalExceptionFilter));

  app.useGlobalFilters(app.get(PrismaExceptionFilter));

  app.useGlobalInterceptors(new TransformInterceptor);

  app.useGlobalInterceptors(new BigintInterceptor);

  const isSentryEnabled = process.env.SENTRY_ENABLED === 'true';

  if (isSentryEnabled) {
    app.useGlobalFilters(new SentryGlobalFilter);
  }
}
