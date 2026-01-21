import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ThemeService } from '../../theme/services/theme.service';
import { Posts } from '../entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
    private themeService: ThemeService,
  ) {}

  async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find({
      relations: { theme: true, user: true },
    });
  }

  async findById(id: number): Promise<Posts> {
    const posts = await this.postsRepository.findOne({
      where: { id },
      relations: { theme: true, user: true },
    });
    if (!posts) {
      throw new HttpException('Post Not Found!', 404);
    }
    return posts;
  }

  async searchForTitle(title: string): Promise<Posts[]> {
    const posts = await this.postsRepository.find({
      where: { title: ILike(`%${title}%`) },
      relations: { theme: true, user: true },
    });
    if (posts.length === 0) {
      throw new HttpException('No Posts Found with this Title!', 404);
    }
    return posts;
  }

  async create(post: Posts): Promise<Posts> {
    const theme = await this.themeService.findById(post.theme.id);

    if (!theme) {
      throw new HttpException('Theme Not Found!', 404);
    }
    post.theme = theme;

    return await this.postsRepository.save(post);
  }

  async update(post: Posts): Promise<Posts> {
    const existsPost = await this.findById(post.id);
    if (!existsPost) {
      throw new HttpException('Post Not Found!', 404);
    }

    const theme = await this.themeService.findById(post.theme.id);
    if (!theme) {
      throw new HttpException('Theme Not Found!', 404);
    }
    post.theme = theme;

    return await this.postsRepository.save(post);
  }

  async delete(id: number): Promise<void> {
    const existsPost = await this.findById(id);
    if (!existsPost) {
      throw new HttpException('Post Not Found!', 404);
    }
    await this.postsRepository.delete(id);
  }
}
