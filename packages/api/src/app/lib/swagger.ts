import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import packageJson from '@/../package.json';
import { isProduction } from '@/common/utils';

export function applySwagger(app: INestApplication) {
  const logger = new Logger('Swagger');

  if (!isProduction) {
    const config = (new DocumentBuilder)
      .setTitle('API')
      .setDescription('API documentation')
      .setVersion(packageJson.version)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document, {
      jsonDocumentUrl: 'api/docs-json',
      swaggerOptions:  {
        persistAuthorization:   true,
        displayRequestDuration: true,
        docExpansion:           'none',
        filter:                 true,
        showRequestHeaders:     true,
      },
    });

    logger.log('Swagger documentation generated');
  }
}
