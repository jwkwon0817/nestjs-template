import { CheckAssetExistsQuery, CheckAssetExistsResult } from '@modules/asset/application';
import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Assets')
@Controller('assets')
export class AssetController {
  constructor(private readonly queryBus: QueryBus) {
  }

  @Get('/exists')
  async checkAssetExists(@Query('key') key: string): Promise<CheckAssetExistsResult> {
    const query = CheckAssetExistsQuery.from({ key });
    const result = await this.queryBus.execute<CheckAssetExistsQuery, CheckAssetExistsResult>(query);

    return result;
  }
}
