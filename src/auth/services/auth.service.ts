import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UserLogin } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.finByUser(username);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const matchPassword = await this.bcrypt.comparePass(
      password,
      user.password,
    );
    if (user && matchPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userLogin: UserLogin) {
    const payload = { sub: userLogin.email };

    const user = await this.userService.finByUser(userLogin.email);

    return {
      id: user?.id,
      name: user?.name,
      username: user?.username,
      password: '',
      picture: user?.picture,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
