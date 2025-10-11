import { DataClass } from 'dataclasses';

export class LoginResponseDto extends DataClass {
  accessToken:  string;
  refreshToken: string;
}
