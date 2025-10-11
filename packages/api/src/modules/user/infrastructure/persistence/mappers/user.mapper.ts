import { UserEntity } from '@modules/user/domain/entities';
import type { User } from '@workspace/database';

export class UserMapper {
  static toDomain(user: User): UserEntity {
    return UserEntity.from(user);
  }

  static toDomainSafe(user: Omit<User, 'password'>): Omit<UserEntity, 'password'> {
    const userEntity = UserEntity.from({
      ...user,
      password: '',
    });

    return userEntity.toSafeUser();
  }

  static toDomainList(users: User[]): UserEntity[] {
    return users.map(user => this.toDomain(user));
  }
}

