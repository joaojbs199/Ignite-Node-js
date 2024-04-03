import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  IQuestionAttachmentParams,
  QuestionAttachment,
} from '@/domain/forum/enterprise/entities/question-attachment'

export const makeQuestionAttachment = (
  override: Partial<IQuestionAttachmentParams> = {},
  id?: UniqueEntityID,
) => {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return questionAttachment
}
