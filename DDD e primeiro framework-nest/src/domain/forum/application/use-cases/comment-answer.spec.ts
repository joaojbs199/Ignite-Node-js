import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { CommentAnswerUseCase } from './comment-answer';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comment-repository';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';

// SUT => System under test

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentsRepository;
let sut: CommentAnswerUseCase;

describe('Comment answer', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentRepository);
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    );

    sut = new CommentAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswerCommentRepository);
  });

  it('Should be able to comment answer', async () => {
    const answer = makeAnswer();

    await inMemoryAnswerRepository.create(answer);

    await sut.handle({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Este é o comentário da resposta',
    });

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      'Este é o comentário da resposta',
    );
  });
});
