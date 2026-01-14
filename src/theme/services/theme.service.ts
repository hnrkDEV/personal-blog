import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Theme } from '../entities/theme.entity';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Theme)
    private themeRepository: Repository<Theme>,
  ) {}

  async findAll(): Promise<Theme[]> {
    return this.themeRepository.find({
      relations: { post: true },
    });
  }

  async findById(id: number): Promise<Theme> {
    const theme = await this.themeRepository.findOne({
      where: { id },
      relations: { post: true },
    });

    if (!theme) {
      throw new HttpException('Theme Not Found!', 404);
    }
    return theme;
  }

  async findByDescription(description: string): Promise<Theme[]> {
    const themes = await this.themeRepository.find({
      where: { description: ILike(`%${description}%`) },
      relations: { post: true },
    });
    if (themes.length === 0) {
      throw new HttpException('No Themes Found with this Description!', 404);
    }
    return themes;
  }

  async create(theme: Theme): Promise<Theme> {
    return await this.themeRepository.save(theme);
  }

  async update(theme: Theme): Promise<Theme> {
    const existsTheme = await this.findById(theme.id);
    if (!existsTheme) {
      throw new HttpException('Theme Not Found!', 404);
    }
    return await this.themeRepository.save(theme);
  }

  async delete(id: number): Promise<void> {
    const existsTheme = await this.findById(id);
    if (!existsTheme) {
      throw new HttpException('Theme Not Found!', 404);
    }
    await this.themeRepository.delete(id);
  }
}
