import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  IQuestionParams,
  Question,
} from '@/domain/forum/enterprise/entities/question'

export const makeQuestion = (
  override: Partial<IQuestionParams> = {},
  id?: UniqueEntityID,
) => {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
