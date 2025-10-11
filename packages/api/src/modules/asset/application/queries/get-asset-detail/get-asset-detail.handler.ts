import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AssetRepository } from '@/modules/asset/infrastructure';
import { GetAssetDetailQuery } from './get-asset-detail.query';
import { GetAssetDetailResult } from './get-asset-detail.result';

@QueryHandler(GetAssetDetailQuery)
export class GetAssetDetailHandler implements IQueryHandler<GetAssetDetailQuery, GetAssetDetailResult> {
  constructor(private readonly assetRepository: AssetRepository) {
  }

  async execute(query: GetAssetDetailQuery): Promise<GetAssetDetailResult> {
    const { id } = query;
    const asset = await this.assetRepository.findById(id);

    if (!asset) {
      throw new NotFoundException(`Asset with id ${id} not found`);
    }

    return GetAssetDetailResult.from(asset);
  }
}

