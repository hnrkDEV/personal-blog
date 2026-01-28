import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Posts } from '../../posts/entities/posts.entity';

@Entity({ name: 'tb_themes' })
export class Theme {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  description: string;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @OneToMany(() => Posts, (post) => post.theme)
  post: Posts[];
}
