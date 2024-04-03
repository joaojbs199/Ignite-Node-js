import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  IQuestionCommentParams,
  QuestionComment,
} from '@/domain/forum/enterprise/entities/question-comment'

export const makeQuestionComment = (
  override: Partial<IQuestionCommentParams> = {},
  id?: UniqueEntityID,
) => {
  const questioncomment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questioncomment
}
