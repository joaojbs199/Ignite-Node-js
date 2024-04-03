import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Answer,
  IAnswerParams,
} from '@/domain/forum/enterprise/entities/answer'

export const makeAnswer = (
  override: Partial<IAnswerParams> = {},
  id?: UniqueEntityID,
) => {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
