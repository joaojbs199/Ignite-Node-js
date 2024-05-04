import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';

// SUT => System under test

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentsRepository;
let sut: FetchRecentQuestionsUseCase;

describe('List recent questions', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
      inMemoryStudentsRepository,
      inMemoryAttachmentsRepository,
    );
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository);
  });

  it('Should be able to list recent questions', async () => {
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 20) }));
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 18) }));
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022, 0, 23) }));

    const result = await sut.handle({
      page: 1,
    });

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ]);
  });

  it('Should be able to list paginated recent questions', async () => {
    for (let i = 1; i <= 26; i++) {
      await inMemoryQuestionRepository.create(makeQuestion());
    }

    const result = await sut.handle({
      page: 2,
    });

    expect(result.value?.questions).toHaveLength(6);
  });
});
