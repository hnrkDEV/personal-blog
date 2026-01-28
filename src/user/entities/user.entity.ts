import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../../posts/entities/posts.entity';

@Entity({ name: 'tb_users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false, unique: true })
  @ApiProperty({ example: 'email@email.com.br' })
  username: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  password: string;

  @Column({ length: 5000, nullable: true })
  @ApiProperty()
  picture: string;

  @ApiProperty()
  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];
}
