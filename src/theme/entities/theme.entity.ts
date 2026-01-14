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
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  description: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Posts, (post) => post.theme)
  post: Posts[];
}
