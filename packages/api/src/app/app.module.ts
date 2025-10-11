import { JwtAuthGuard } from '@modules/user/infrastructure/guards';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SentryModule } from '@sentry/nestjs/setup';
import { GlobalExceptionFilter, PrismaExceptionFilter } from '@/common/filters';
import { AppController } from './app.controller';
import { DatabaseModule, FeatureModule } from './integration';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    FeatureModule,
    SentryModule.forRoot(),
  ],
  controllers: [AppController],
  providers:   [
    GlobalExceptionFilter,
    PrismaExceptionFilter,
    {
      provide:  APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
}
