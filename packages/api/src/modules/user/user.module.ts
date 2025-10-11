import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '@/common/modules/prisma';
import { RedisModule } from '@/common/modules/redis';
import { LoginHandler, LogoutHandler } from './application/commands';
import { RefreshTokenHandler } from './application/commands/refresh-token/refresh-token.handler';
import { AuthFacade } from './application/facades';
import { ValidateAccessTokenHandler } from './application/queries';
import { UserRepository } from './infrastructure/persistence';
import { AuthController } from './presentation/controllers';
import { JwtStrategy } from './strategy/jwt.strategy';

const CommandHandlers = [
  LoginHandler,
  LogoutHandler,
  RefreshTokenHandler,
];

const QueryHandlers = [ValidateAccessTokenHandler];

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    PassportModule,
    PrismaModule,
    RedisModule,
    JwtModule.registerAsync({
      imports:    [ConfigModule],
      useFactory: (configService: ConfigService) => ({ secret: configService.get<string>('JWT_SECRET') }),
      inject:     [ConfigService],
    }),
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    AuthFacade,
    JwtStrategy,
    UserRepository,
  ],
  controllers: [AuthController],
  exports:     [AuthFacade, JwtModule],
})
export class UserModule {
}
