import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import { JwtService } from '@nestjs/jwt';
import { StudentFactory } from 'test/factories/make-student';
import { QuestionFactory } from 'test/factories/make-question';
import { DatabaseModule } from '@/infra/database/database.module';
import { AnswerFactory } from 'test/factories/make-answer';

describe('Fetch question answers (e2e)', () => {
  let app: INestApplication;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let answerFactory: AnswerFactory;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    answerFactory = moduleRef.get(AnswerFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('[GET] /questions/:questionId/answers', async () => {
    const user = await studentFactory.makePrismaStudent();

    const token = jwt.sign({ sub: user.id.toString() });

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
      title: 'Question 01',
    });

    const questionId = question.id.toString();

    await Promise.all([
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: question.id,
        content: 'Answer 01',
      }),
      answerFactory.makePrismaAnswer({
        authorId: user.id,
        questionId: question.id,
        content: 'Answer 02',
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      answers: expect.arrayContaining([
        expect.objectContaining({ content: 'Answer 01' }),
        expect.objectContaining({ content: 'Answer 02' }),
      ]),
    });
  });
});
