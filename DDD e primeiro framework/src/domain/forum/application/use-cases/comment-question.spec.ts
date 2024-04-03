import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentQuestionUseCase } from './comment-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

// SUT => System under test

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentsRepository
let sut: CommentQuestionUseCase

describe('Comment question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    )
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()

    sut = new CommentQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('Should be able to comment question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.handle({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Este é o comentário da pergunta',
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'Este é o comentário da pergunta',
    )
  })
})
