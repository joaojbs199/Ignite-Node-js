import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create account (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  test('[POST] /accounts', async () => {
    const email = 'john_doe@test.com';
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Doe',
      email,
      password: '123456',
    });

    expect(response.statusCode).toBe(201);

    const createdUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    expect(createdUser).toMatchObject({
      name: 'John Doe',
      email,
    });
  });
});
