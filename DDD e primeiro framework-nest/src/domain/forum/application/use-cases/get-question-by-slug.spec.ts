import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug/slug';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository';
import { makeStudent } from 'test/factories/make-student';
import { makeAttachment } from 'test/factories/make-attachment';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

// SUT => System under test

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
      inMemoryStudentsRepository,
      inMemoryAttachmentsRepository,
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository);
  });

  it('Should be able to get a question by slug', async () => {
    const student = makeStudent({ name: 'John Doe' });

    inMemoryStudentsRepository.items.push(student);

    const newQuestion = makeQuestion({
      authorId: student.id,
      slug: Slug.create('example-question'),
    });

    await inMemoryQuestionRepository.create(newQuestion);

    const attachment1 = makeAttachment({
      title: 'Attachment 1',
    });

    const attachment2 = makeAttachment({
      title: 'Attachment 2',
    });

    await inMemoryAttachmentsRepository.items.push(attachment1, attachment2);

    await inMemoryQuestionAttachmentRepository.items.push(
      makeQuestionAttachment({
        attachmentId: attachment1.id,
        questionId: newQuestion.id,
      }),
    );

    await inMemoryQuestionAttachmentRepository.items.push(
      makeQuestionAttachment({
        attachmentId: attachment2.id,
        questionId: newQuestion.id,
      }),
    );

    const result = await sut.handle({
      slug: 'example-question',
    });

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
        author: student.name,
        attachments: expect.arrayContaining([
          expect.objectContaining({ title: 'Attachment 1' }),
          expect.objectContaining({ title: 'Attachment 2' }),
        ]),
      }),
    });
  });
});
