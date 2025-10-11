import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '@/modules/user/infrastructure/persistence';
import { UserDetailQuery } from './user-detail.query';
import { UserDetailResult } from './user-detail.result';

@QueryHandler(UserDetailQuery)
export class UserDetailHandler implements IQueryHandler<UserDetailQuery, UserDetailResult> {
  constructor(private readonly userRepository: UserRepository) {
  }

  async execute(query: UserDetailQuery): Promise<UserDetailResult> {
    const { id } = query;    const user = await this.userRepository.findByIdOrThrow(id);

    return UserDetailResult.from(user);
  }
}
