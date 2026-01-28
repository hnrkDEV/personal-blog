import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userId: any;
  let token: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve cadastrar um novo usuário', async () => {
    const res = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        name: 'User Teste',
        username: 'user@teste.com',
        password: '123456789',
      })
      .expect(201);

    userId = res.body.id;
  });

  it('02 - Não Deve Cadastrar um Usuário Duplicado', async () => {
    await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        name: 'User Teste',
        username: 'user@teste.com',
        password: '123456789',
      })
      .expect(400);
  });

  it('03 - Deve Autenticar o Usuário (Login)', async () => {
    const res = await request(app.getHttpServer())
      .post('/usuarios/login')
      .send({
        username: 'user@teste.com',
        password: '123456789',
      })
      .expect(200);

    token = res.body.token;
  });

  it('04 - Deve Listar todos os Usuários', async () => {
    return request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200);
  });

  it('05 - Deve Atualizar um Usuário', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: userId,
        name: 'Usuário Atualizado',
        username: 'user@teste.com',
        password: '123456789',
        picture: '-',
      })
      .expect(200)
      .then((resposta) => {
        expect('Usuário Atualizado').toEqual(resposta.body.name);
      });
  });
});
