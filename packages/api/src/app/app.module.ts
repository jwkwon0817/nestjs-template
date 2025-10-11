import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
  providers:   [GlobalExceptionFilter, PrismaExceptionFilter],
})
export class AppModule {
}
