export class UploadMultipleAssetsCommand {
  constructor(
    public readonly files: Express.Multer.File[],
    public readonly path?: string,
  ) {}
}

