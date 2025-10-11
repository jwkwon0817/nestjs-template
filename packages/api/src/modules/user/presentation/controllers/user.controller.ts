import { ApiResponseType } from '@common/lib/swagger/decorators';
import { UserDetailQuery, UserDetailResult } from '@modules/user/application/queries';
import { UserEntity } from '@modules/user/domain/entities';
import { CurrentUser } from '@modules/user/presentation/decorators';
import { Controller, Get, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { UserDetailResponseDto } from '../dtos/response/user-detail.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly queryBus: QueryBus) {
  }

  @Get('me')
  @ApiResponseType({
    type:        UserDetailResponseDto,
    description: 'User detail successful',
    errors:      [
      400,
      401,
      500,
    ],
  })
  async detail(@CurrentUser() user: UserEntity): Promise<UserDetailResponseDto> {
    const query = UserDetailQuery.from({ id: user.id });
    const result = await this.queryBus.execute<UserDetailQuery, UserDetailResult>(query);

    return UserDetailResponseDto.from(result);
  }
}
