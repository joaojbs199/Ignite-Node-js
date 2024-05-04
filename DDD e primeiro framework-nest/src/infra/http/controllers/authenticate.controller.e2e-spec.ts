import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import { hash } from 'bcryptjs';
import { StudentFactory } from 'test/factories/make-student';
import { DatabaseModule } from '@/infra/database/database.module';

describe('Authenticate (e2e)', () => {
  let app: INestApplication;
  let studentFactory: StudentFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    studentFactory = moduleRef.get(StudentFactory);
    await app.init();
  });

  test('[POST] /sessions', async () => {
    const email = 'john_doe@test.com';
    const passwordHash = await hash('123456', 10);

    await studentFactory.makePrismaStudent({ password: passwordHash, email });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email,
      password: '123456',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
