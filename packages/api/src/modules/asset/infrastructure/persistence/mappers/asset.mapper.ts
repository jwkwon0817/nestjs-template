import type { Asset } from '@workspace/database';
import { AssetEntity } from '@/modules/asset/domain';

export class AssetMapper {
  static toDomain(asset: Asset): AssetEntity {
    return AssetEntity.from(asset);
  }

  static toDomainList(assets: Asset[]): AssetEntity[] {
    return assets.map(asset => this.toDomain(asset));
  }
}

