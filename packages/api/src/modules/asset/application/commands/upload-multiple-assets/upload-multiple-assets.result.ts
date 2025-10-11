export class UploadMultipleAssetsResult {
  constructor(
    public readonly assets: Array<{
      id:       string;
      key:      string;
      url:      string;
      filename: string;
    }>,
  ) {}
}

