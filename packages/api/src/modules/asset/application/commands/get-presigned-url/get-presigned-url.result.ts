export class GetPresignedUrlResult {
  constructor(
    public readonly url: string,
    public readonly expiresAt: Date,
  ) {}
}

