import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  IAnswerAttachmentParams,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export const makeAnswerAttachment = (
  override: Partial<IAnswerAttachmentParams> = {},
  id?: UniqueEntityID,
) => {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return answerAttachment
}
