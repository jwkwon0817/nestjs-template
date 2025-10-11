import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { envValidationSchema } from '@/common/validation';

@Global()
@Module({ imports: [
  NestConfigModule.forRoot({
    isGlobal:         true,
    envFilePath:      '.env',
    validationSchema: envValidationSchema,
  }),
] })
export class ConfigModule {
}
