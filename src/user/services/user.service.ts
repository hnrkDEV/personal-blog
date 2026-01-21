import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcrypt: Bcrypt,
  ) {}

  async finByUser(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const existsUser = await this.userRepository.findOneBy({ id });
    if (!existsUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return existsUser;
  }

  async createUser(user: User): Promise<User> {
    const searchUser = await this.finByUser(user.username);
    if (searchUser) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = await this.bcrypt.encodePass(user.password);
    return this.userRepository.save(user);
  }

  async update(user: User): Promise<User> {
    await this.findById(user.id);
    const searchUser = await this.finByUser(user.username);
    if (searchUser && searchUser.id !== user.id) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = await this.bcrypt.encodePass(user.password);
    return this.userRepository.save(user);
  }
}
