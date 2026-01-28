import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Posts } from '../entities/posts.entity';
import { PostsService } from '../services/posts.service';

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller('/postagens')
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    return this.postsService.findById(id);
  }

  @Get('/titulo/:title')
  @HttpCode(HttpStatus.OK)
  searchForTitle(@Param('title') title: string): Promise<Posts[]> {
    return this.postsService.searchForTitle(title);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() post: Posts): Promise<Posts> {
    return this.postsService.create(post);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() post: Posts): Promise<Posts> {
    return this.postsService.update(post);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.postsService.delete(id);
  }
}
