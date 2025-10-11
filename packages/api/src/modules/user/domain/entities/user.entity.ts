import { UserStatus } from '@workspace/database';
import { DataClass } from 'dataclasses';

export type UserEntitySafe = Omit<UserEntity, 'password'>;

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

  toSafeUser(): UserEntitySafe {
    const { password: _password, ...safeUser } = this;

    return safeUser as UserEntitySafe;
  }
}

