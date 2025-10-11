import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthFacade } from '../application/facades/auth.facade';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService,
    private readonly authFacade: AuthFacade) {
    super({
      jwtFromRequest:    ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:  false,
      secretOrKey:       configService.get<string>('JWT_SECRET') || '',
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    const result = await this.authFacade.validateAccessToken(token);

    return result.user;
  }
}
