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
} from '@nestjs/common';
import { Theme } from '../entities/theme.entity';
import { ThemeService } from '../services/theme.service';

@Controller('/temas')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Theme[]> {
    return this.themeService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Theme> {
    return this.themeService.findById(id);
  }

  @Get('/descricao/:description')
  @HttpCode(HttpStatus.OK)
  findByDescription(
    @Param('description') description: string,
  ): Promise<Theme[]> {
    return this.themeService.findByDescription(description);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() theme: Theme): Promise<Theme> {
    return this.themeService.create(theme);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() theme: Theme): Promise<Theme> {
    return this.themeService.update(theme);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(id: number): Promise<void> {
    return this.themeService.delete(id);
  }
}
