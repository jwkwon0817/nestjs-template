import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserRepositoryPort } from '@modules/user/domain/repositories/user.repository.port';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {
  }

  async findUserById(id: string): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit:  { password: true },
    });

    if (!user) {
      return null;
    }

    const userEntity = UserEntity.from({
      ...user, password: '',
    });

    return userEntity.toSafeUser();
  }

  async findUserByIdWithPassword(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return UserEntity.from(user);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return UserEntity.from(user);
  }
}
