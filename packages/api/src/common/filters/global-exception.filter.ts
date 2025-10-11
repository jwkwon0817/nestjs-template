import { Temporal } from '@js-temporal/polyfill';
import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';
import type { Request, Response } from 'express';
import { APIResponseDto, type HttpMethod } from '@/common/dto/response.dto';
import { LogService } from '../modules/log/log.service';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LogService) {
  }

  @SentryExceptionCaptured()
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let details = exception.message || 'Internal Server Error';
    let errors: unknown = null;

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse() as {
        message: string | string[];
        errors?: unknown;
      };

      details = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message.join(', ')
        : exceptionResponse.message;

      errors = exceptionResponse.errors ?? null;
    }

    const apiResponse = APIResponseDto.from({
      status:   status,
      method:   request.method as HttpMethod,
      instance: request.url,
      details:  details,
      data:     null,
      errors,
    });

    response.status(apiResponse.status).send(apiResponse);

    const isDevelopment = process.env.NODE_ENV === 'development';
    const is4xxError = status >= 400 && status < 500;
    const is5xxError = status >= 500;

    if (isDevelopment) {
      if ((is4xxError && status !== HttpStatus.NOT_FOUND) || is5xxError) {
        this.logDetailedError(exception, request);
      }
    } else {
      if (is5xxError) {
        this.logger.error('GlobalExceptionFilter', `${exception.name} - ${exception.message}`);
      }
    }
  }

  private logDetailedError(exception: Error, request: Request) {
    const timestamp = Temporal.Now.instant().toString();

    const errorDetails = {
      timestamp,
      exception: {
        name:    exception.name,
        message: exception.message,
        stack:   exception.stack?.split('\n').slice(0, 10)
          .join('\n'),
      },
      request: {
        method:        request.method,
        url:           request.url,
        authorization: request.headers.authorization || '',
      },
    };

    this.logger.error('GlobalExceptionFilter',
      `🚨 Detailed Exception Log\n${JSON.stringify(errorDetails, null, 2)}`);
  }
}
