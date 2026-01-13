import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Posts } from '../entities/posts.entity';
import { PostsService } from '../services/posts.service';

@Controller('/postagens')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }
}
