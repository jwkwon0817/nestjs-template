import { AssetModule } from '@modules/asset';
import { UserModule } from '@modules/user';
import { Module } from '@nestjs/common';

const features = [AssetModule, UserModule];

@Module({
  imports: [...features],
  exports: [...features],
})
export class FeatureModule {
}

