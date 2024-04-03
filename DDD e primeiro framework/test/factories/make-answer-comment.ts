import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  IAnswerCommentParams,
  AnswerComment,
} from '@/domain/forum/enterprise/entities/answer-comment'

export const makeAnswerComment = (
  override: Partial<IAnswerCommentParams> = {},
  id?: UniqueEntityID,
) => {
  const answercomment = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answercomment
}
