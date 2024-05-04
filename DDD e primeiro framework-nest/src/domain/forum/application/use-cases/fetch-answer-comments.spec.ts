import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository';
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { makeStudent } from 'test/factories/make-student';

// SUT => System under test

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe('List answer comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    );
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it('Should be able to list answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' });

    inMemoryStudentsRepository.items.push(student);

    const comment1 = makeAnswerComment({
      authorId: student.id,
      answerId: new UniqueEntityID('answer-1'),
    });
    const comment2 = makeAnswerComment({
      authorId: student.id,
      answerId: new UniqueEntityID('answer-1'),
    });
    const comment3 = makeAnswerComment({
      authorId: student.id,
      answerId: new UniqueEntityID('answer-1'),
    });

    await inMemoryAnswerCommentsRepository.create(comment1);
    await inMemoryAnswerCommentsRepository.create(comment2);
    await inMemoryAnswerCommentsRepository.create(comment3);

    const result = await sut.handle({
      answerId: 'answer-1',
      page: 1,
    });

    expect(result.value?.comments).toHaveLength(3);
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ author: 'John Doe', commentId: comment1.id }),
        expect.objectContaining({ author: 'John Doe', commentId: comment2.id }),
        expect.objectContaining({ author: 'John Doe', commentId: comment3.id }),
      ]),
    );
  });

  it('Should be able to list paginated answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' });

    inMemoryStudentsRepository.items.push(student);

    for (let i = 1; i <= 26; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          authorId: student.id,
          answerId: new UniqueEntityID('answer-1'),
        }),
      );
    }

    const result = await sut.handle({
      answerId: 'answer-1',
      page: 2,
    });

    expect(result.value?.comments).toHaveLength(6);
  });
});
