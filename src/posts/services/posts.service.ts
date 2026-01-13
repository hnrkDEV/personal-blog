import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Posts } from '../entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<Posts[]> {
    return await this.postsRepository.find();
  }

  async findById(id: number): Promise<Posts> {
    const posts = await this.postsRepository.findOneBy({ id });
    if (!posts) {
      throw new HttpException('Post Not Found!', 404);
    }
    return posts;
  }

  async searchForTitle(title: string): Promise<Posts[]> {
    const posts = await this.postsRepository.find({
      where: { title: ILike(`%${title}%`) },
    });
    if (posts.length === 0) {
      throw new HttpException('No Posts Found with this Title!', 404);
    }
    return posts;
  }

  async create(post: Posts): Promise<Posts> {
    return await this.postsRepository.save(post);
  }

  async update(post: Posts): Promise<Posts> {
    const existsPost = await this.findById(post.id);
    if (!existsPost) {
      throw new HttpException('Post Not Found!', 404);
    }
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
