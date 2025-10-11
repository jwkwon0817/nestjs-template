import { DataClass } from 'dataclasses';

export class LoginResult extends DataClass {
  accessToken:  string;
  refreshToken: string;
}

