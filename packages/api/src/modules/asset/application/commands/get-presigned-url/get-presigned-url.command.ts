export class GetPresignedUrlCommand {
  constructor(public readonly id: string,
    public readonly expiresIn?: number) {
  }
}

