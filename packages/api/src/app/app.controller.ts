import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get } from '@nestjs/common';
import packageJson from '@/../package.json';

@Controller()
export class AppController {
  @Get('/version')
  @CacheKey('app.version')
  @CacheTTL(60)
  getVersion(): string {
    return packageJson.version;
  }
}
