import { DataClass } from 'dataclasses';

export type UserStatus = 'ACTIVE' | 'INACTIVE';

export class UserEntity extends DataClass {
  id:       string;
  email:    string;
  password: string;
  status:   UserStatus;

  createdAt: Date;
  updatedAt: Date;

  isActive(): boolean {
    return this.status === 'ACTIVE';
  }

  isInactive(): boolean {
    return this.status === 'INACTIVE';
  }

  toSafeUser(): Omit<UserEntity, 'password'> {
    const { password: _password, ...safeUser } = this;

    return safeUser as Omit<UserEntity, 'password'>;
  }
}

