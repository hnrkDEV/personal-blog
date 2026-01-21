import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private _usernameField: string;
  private _passwordField: string;
  constructor(private readonly authService: AuthService) {
    super();
    this._usernameField = 'username';
    this._passwordField = 'password';
  }

  async validate(username: string, password: string): Promise<any> {
    const validateUser = await this.authService.validateUser(
      username,
      password,
    );
    if (!validateUser) {
      throw new UnauthorizedException(
        'Username or password is incorrect. Verify and try again.',
      );
    }
    return validateUser;
  }
}
