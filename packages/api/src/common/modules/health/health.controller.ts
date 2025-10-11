import { RedisHealthIndicator } from '@liaoliaots/nestjs-redis-health'; // Redis HealthIndicator
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaClient } from '@workspace/database';
import Redis from 'ioredis';
import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { Public } from '@/modules/user/presentation/decorators';

@Controller()
export class HealthController {
  private readonly redis: Redis;
  constructor(
    private healthIndicator: HealthCheckService,
    private httpIndicator: HttpHealthIndicator,
    private prismaIndicator: PrismaHealthIndicator,
    private redisIndicator: RedisHealthIndicator,
    private readonly prismaService: PrismaService,
  ) {
    this.redis =  new Redis(process.env.REDIS_URL ?? '');
  }

  @Public()
  @Get('health')
  @HealthCheck()
  check() {
    return this.healthIndicator.check([
      () => this.httpIndicator.pingCheck('google', 'https://google.com'),
      () => this.prismaIndicator.pingCheck('postgres', this.prismaService as PrismaClient),
      () => this.redisIndicator.checkHealth('redis', {
        type: 'redis', client: this.redis,
      }),
    ]);
  }
}
