import { ApiResponseType } from '@common/lib/swagger/decorators';
import {
  LoginCommand,
  LoginResult,
  LogoutCommand,
  LogoutResult,
  RefreshTokenCommand,
  RefreshTokenResult,
} from '@modules/user/application/commands';
import { UserEntity } from '@modules/user/domain/entities';
import { CurrentUser, Public } from '@modules/user/presentation/decorators';
import {
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  RefreshTokenRequestDto,
} from '@modules/user/presentation/dtos';
import {
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly commandBus: CommandBus) {
  }

  @Public()
  @Post('login')
  @ApiResponseType({
    type:        LoginResponseDto,
    description: 'User login successful',
    errors:      [
      400,
      401,
      500,
    ],
  })
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    const command = LoginCommand.from(dto);
    const result = await this.commandBus.execute<LoginCommand, LoginResult>(command);

    return LoginResponseDto.from(result);
  }

  @Post('logout')
  @ApiResponseType({
    type:        'boolean',
    description: 'User logout successful',
    errors:      [
      401,
      500,
    ],
  })
  async logout(@CurrentUser() user: UserEntity, @Body() dto: LogoutRequestDto): Promise<boolean> {
    const command = LogoutCommand.from({
      userId:       user.id,
      refreshToken: dto.refreshToken,
    });

    const result = await this.commandBus.execute<LogoutCommand, LogoutResult>(command);

    return result.success;
  }

  @Public()
  @Post('refresh')
  @ApiResponseType({
    type:        LoginResponseDto,
    description: 'Token refresh successful',
    errors:      [
      400,
      401,
      500,
    ],
  })
  async refreshToken(@Body() dto: RefreshTokenRequestDto): Promise<LoginResponseDto> {
    const command = RefreshTokenCommand.from(dto);
    const result = await this.commandBus.execute<RefreshTokenCommand, RefreshTokenResult>(command);

    return LoginResponseDto.from(result);
  }
}
