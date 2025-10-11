import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { S3Module } from '@/common/modules/s3';
import {
  CheckAssetExistsHandler,
  DeleteAssetHandler,
  GetAssetDetailHandler,
  GetPresignedUrlHandler,
  UploadAssetHandler,
  UploadMultipleAssetsHandler,
} from './application';
import { AssetFacade } from './application/facades';
import { AssetRepository } from './infrastructure';
import { AssetController } from './presentation';

const commandHandlers = [
  UploadAssetHandler,
  UploadMultipleAssetsHandler,
  DeleteAssetHandler,
  GetPresignedUrlHandler,
];

const queryHandlers = [
  CheckAssetExistsHandler,
  GetAssetDetailHandler,
];

@Module({
  imports:   [CqrsModule, S3Module],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    AssetFacade,
    AssetRepository,
  ],
  controllers: [AssetController],
  exports:     [AssetFacade],
})
export class AssetModule {
}

