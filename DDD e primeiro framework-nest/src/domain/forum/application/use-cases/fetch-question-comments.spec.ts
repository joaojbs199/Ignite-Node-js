import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { FetchQuestionCommentsUserCase } from './fetch-question-comments';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { makeStudent } from 'test/factories/make-student';

// SUT => System under test

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let sut: FetchQuestionCommentsUserCase;

describe('List question comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    );
    sut = new FetchQuestionCommentsUserCase(inMemoryQuestionCommentsRepository);
  });

  it('Should be able to list question comments', async () => {
    const student = makeStudent({ name: 'John Doe' });

    inMemoryStudentsRepository.items.push(student);

    const comment1 = makeQuestionComment({
      authorId: student.id,
      questionId: new UniqueEntityID('question-1'),
    });
    const comment2 = makeQuestionComment({
      authorId: student.id,
      questionId: new UniqueEntityID('question-1'),
    });
    const comment3 = makeQuestionComment({
      authorId: student.id,
      questionId: new UniqueEntityID('question-1'),
    });

    await inMemoryQuestionCommentsRepository.create(comment1);
    await inMemoryQuestionCommentsRepository.create(comment2);
    await inMemoryQuestionCommentsRepository.create(comment3);

    const result = await sut.handle({
      questionId: 'question-1',
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

  it('Should be able to list paginated question comments', async () => {
    const student = makeStudent({ name: 'John Doe' });

    inMemoryStudentsRepository.items.push(student);

    for (let i = 1; i <= 26; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
          authorId: student.id,
        }),
      );
    }

    const result = await sut.handle({
      questionId: 'question-1',
      page: 2,
    });

    expect(result.value?.comments).toHaveLength(6);
  });
});
