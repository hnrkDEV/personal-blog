import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Personal Blog')
    .setDescription(
      `
API desenvolvida como projeto educacional e de portfólio, com o objetivo de aplicar na prática conceitos de desenvolvimento back-end utilizando NestJS.
O projeto consiste em um blog pessoal, permitindo o gerenciamento de usuários, autenticação, publicação de conteúdos e organização de dados, seguindo boas práticas de arquitetura, validação, segurança e testes automatizados.
A API foi construída com foco em aprendizado, clareza de código e escalabilidade, servindo como base para estudos, experimentações e futuras evoluções.
`,
    )
    .setContact(
      'João Henrique',
      'https://joaohenriquesilva-dev.vercel.app',
      'jhenrique.caval@hotmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
