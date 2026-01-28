import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Posts } from '../../posts/entities/posts.entity';
import { Theme } from '../../theme/entities/theme.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_personalblog',
      entities: [Posts, Theme, User],
      synchronize: true,
    };
  }
}
