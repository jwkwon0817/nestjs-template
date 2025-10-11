export class UploadAssetCommand {
  constructor(public readonly file: Express.Multer.File,
    public readonly path?: string) {
  }
}

