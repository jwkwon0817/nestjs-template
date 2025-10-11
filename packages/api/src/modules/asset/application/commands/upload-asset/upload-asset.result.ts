export class UploadAssetResult {
  constructor(public readonly id: string,
    public readonly key: string,
    public readonly url: string,
    public readonly filename: string) {
  }
}

