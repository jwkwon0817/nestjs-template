import { UserEntity } from '../entities/user.entity';

export interface UserRepositoryPort {
  findUserById(id: string): Promise<Omit<UserEntity, 'password'> | null>;

  findUserByIdWithPassword(id: string): Promise<UserEntity | null>;

  findUserByEmail(email: string): Promise<UserEntity | null>;
}
