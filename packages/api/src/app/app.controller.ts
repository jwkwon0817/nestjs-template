import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import packageJson from '@/../package.json';
import { Public } from '@/modules/user/presentation/decorators';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  @Public()
  @Get('/version')
  @CacheKey('app.version')
  @CacheTTL(60)
  getVersion(): string {
    return packageJson.version;
  }
}
