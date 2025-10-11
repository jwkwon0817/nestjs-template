import { ACCESS_TOKEN_EXPIRES_IN, JwtPayload, REFRESH_TOKEN_EXPIRES_IN_SECONDS } from '@modules/user/domain';
import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { LogService } from '@/common/modules/log';
import { RedisService } from '@/common/modules/redis';
import { comparePassword } from '@/common/utils/bcrypt';
import { UserRepository } from '@/modules/user/infrastructure';
import { LoginCommand } from './login.command';
import { LoginResult } from './login.result';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, LoginResult> {
  constructor(private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly redis: RedisService,
    private readonly logger: LogService) {
  }

  async execute(command: LoginCommand): Promise<LoginResult> {
    const user = await this.userRepository.findUserByEmail(command.email);

    if (!user || !await comparePassword(command.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.isInactive()) {
      throw new UnauthorizedException('Inactive user');
    }

    const tokens = await this.generateTokens(user.id);

    this.logger.log('Auth', `Login success (User ID: ${user.id})`);

    return LoginResult.from(tokens);
  }

  private async generateTokens(userId: string) {
    const accessTokenPayload: JwtPayload = {
      sub: userId, type: 'access',
    };

    const refreshTokenPayload: JwtPayload = {
      sub: userId, type: 'refresh',
    };

    const accessToken = this.jwtService.sign(accessTokenPayload, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, { expiresIn: `${REFRESH_TOKEN_EXPIRES_IN_SECONDS}s` });

    await this.redis.sadd(`refresh:${userId}`, refreshToken);

    await this.redis.expire(`refresh:${userId}`, REFRESH_TOKEN_EXPIRES_IN_SECONDS);

    return {
      accessToken, refreshToken,
    };
  }
}
