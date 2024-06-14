import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as path from 'path';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  //CATEGORYS-------------------------------------------------------------------------------//
  it('/category (GET)', () => {
    return request(app.getHttpServer()).get('/category').expect(200).expect([]);
  });

  it('/category/:id === 0 (GET)', () => {
    return request(app.getHttpServer())
      .get('/category/0')
      .expect(200)
      .expect('');
  });

  it('/category (POST)', () => {
    return request(app.getHttpServer())
      .post('/category')
      .send({ name: 'Новая категория' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        );
      });
  });

  it('/category (GET)', () => {
    return request(app.getHttpServer())
      .get('/category')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'Новая категория',
        },
      ]);
  });

  it('/category/:id === 1 (GET)', () => {
    return request(app.getHttpServer()).get('/category/1').expect(200).expect({
      id: 1,
      name: 'Новая категория',
    });
  });

  it('/category/:id === 1 (DELETE)', () => {
    return request(app.getHttpServer()).delete('/category/1').expect(200);
  });

  it('/category (GET)', () => {
    return request(app.getHttpServer()).get('/category').expect(200).expect([]);
  });

  //POSTS----------------------------------------------------------------------------//
  it('/post (GET)', () => {
    return request(app.getHttpServer()).get('/post').expect(200).expect([]);
  });

  it('/post/:id === 0 (GET)', () => {
    return request(app.getHttpServer()).get('/post/0').expect(200).expect('');
  });

  it('/post (POST)', () => {
    return request(app.getHttpServer())
      .post('/post')
      .send({
        title: 'Новый пост',
        body: 'Содержание',
        author: {
          id: 1,
          first_name: 'Пользователь',
          last_name: 'Пользователь',
          email: 'testuser@mail.ru',
          password: '111',
        },
        status: 'Черновик',
        changed_at: '2024-06-04 16:23:59',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            title: 'Новый пост',
            body: 'Содержание',
            status: 'Черновик',
            id: expect.any(Number),
            changed_at: expect.any(String),
            author: expect.objectContaining({
              id: expect.any(Number),
              email: 'testuser@mail.ru',
              first_name: 'Пользователь',
              last_name: 'Пользователь',
              password: '111',
            }),
          }),
        );
      });
  });

  it('/post (GET)', () => {
    return request(app.getHttpServer())
      .get('/post')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining([
            {
              id: 1,
              title: 'Новый пост',
              body: 'Содержание',
              status: 'Черновик',
              changed_at: expect.any(String), // Используем шаблон для строки
              category: null,
              authorId: null,
            },
          ]),
        );
      });
  });

  it('/post/:id === 1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/post/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: 1,
            title: 'Новый пост',
            body: 'Содержание',
            status: 'Черновик',
            changed_at: expect.any(String), // Используем шаблон для строки
            category: null,
            authorId: null,
          }),
        );
      });
  });

  it('/post/:id === 1 (DELETE)', () => {
    return request(app.getHttpServer()).delete('/post/1').expect(200);
  });

  it('/post (GET)', () => {
    return request(app.getHttpServer()).get('/post').expect(200).expect([]);
  });

  //USERS--------------------------------------------------------------------------AUTH//
  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect([]);
  });

  it('/users/:email (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/email')
      .expect(200)
      .expect('');
  });

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        first_name: 'Пользователь',
        last_name: 'Пользователь',
        email: 'testuser@mail.ru',
        password: '11111', //от 5 символов
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            first_name: 'Пользователь',
            last_name: 'Пользователь',
            email: 'testuser@mail.ru',
            password: expect.any(String),
          }),
        );
      });
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@mail.ru',
        password: '11111',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            first_name: expect.any(String),
            last_name: expect.any(String),
            email: 'testuser@mail.ru',
            password: expect.any(String),
            access_token: expect.any(String),
          }),
        );
      });
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining([
            {
              id: 1,
              first_name: 'Пользователь',
              last_name: 'Пользователь',
              email: 'testuser@mail.ru',
              password: expect.any(String),
            },
          ]),
        );
      });
  });

  it('/users/:email (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/testuser@mail.ru')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: 1,
            first_name: 'Пользователь',
            last_name: 'Пользователь',
            email: 'testuser@mail.ru',
            password: expect.any(String),
          }),
        );
      });
  });

  it('/users/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .send({ first_name: 'Vadim' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: 1,
            first_name: 'Vadim',
          }),
        );
      });
  });

  it('/users/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/users/1').expect(200);
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect([]);
  });

  //FILE...........................................
  it('/file/upload (POST)', () => {
    return request(app.getHttpServer())
      .post('/file/upload')
      .attach('file', path.join(__dirname, 'test.jpg')) // Замените на путь к вашему тестовому файлу
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            filename: expect.any(String),
            mimetype: expect.any(String),
            data: expect.objectContaining({
              type: 'Buffer',
              data: expect.any(Array),
            }),
          }),
        );
      });
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
