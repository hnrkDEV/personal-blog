import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeModule } from '../theme/theme.module';
import { PostsController } from './controllers/posts.controller';
import { Posts } from './entities/posts.entity';
import { PostsService } from './services/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), ThemeModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [],
})
export class PostsModule {}
