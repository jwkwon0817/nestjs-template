import {
  LoginCommand,
  LoginResult,
  LogoutCommand,
  LogoutResult,
  RefreshTokenCommand,
  RefreshTokenResult,
} from '@modules/user/application';
import { Authenticated, CurrentUser } from '@modules/user/decorators';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import {
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  RefreshTokenRequestDto,
} from '@modules/user/presentation';
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

  @Post('login')
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    this.logger.log('===== LOGIN REQUEST START =====');

    this.logger.log(`Received DTO: ${JSON.stringify(dto)}`);

    this.logger.log(`DTO keys: ${Object.keys(dto).join(', ')}`);

    this.logger.log(`DTO.email: ${dto.email}`);

    this.logger.log(`DTO.password: ${dto.password ? '[HIDDEN]' : undefined}`);

    this.logger.log(`DTO is instance of LoginRequestDto: ${dto instanceof LoginRequestDto}`);

    this.logger.log('===== LOGIN REQUEST END =====');

    const command = LoginCommand.from(dto);
    const result = await this.commandBus.execute<LoginCommand, LoginResult>(command);

    return {
      accessToken:  result.accessToken,
      refreshToken: result.refreshToken,
    };
  }

  @Post('logout')
  @Authenticated()
  async logout(@CurrentUser() user: UserEntity, @Body() dto: LogoutRequestDto): Promise<boolean> {
    const command = LogoutCommand.from({
      userId:       user.id,
      refreshToken: dto.refreshToken,
    });

    const result = await this.commandBus.execute<LogoutCommand, LogoutResult>(command);

    return result.success;
  }

  @Post('refresh')
  async refreshToken(@Body() dto: RefreshTokenRequestDto): Promise<LoginResponseDto> {
    const command = RefreshTokenCommand.from(dto);
    const result = await this.commandBus.execute<RefreshTokenCommand, RefreshTokenResult>(command);

    return {
      accessToken:  result.accessToken,
      refreshToken: result.refreshToken,
    };
  }
}
