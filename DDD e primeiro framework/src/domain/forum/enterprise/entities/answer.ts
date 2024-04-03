import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { AnswerAttachmentList } from './answer-attachment-list'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { AnswerCreatedEvent } from '../events/answer-created-event'

export interface IAnswerParams {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  attachments: AnswerAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends AggregateRoot<IAnswerParams> {
  private touch() {
    this.params.updatedAt = new Date()
  }

  get authorId() {
    return this.params.authorId
  }

  get questionId() {
    return this.params.questionId
  }

  get content() {
    return this.params.content
  }

  set content(content: string) {
    this.params.content = content
    this.touch()
  }

  get attachments() {
    return this.params.attachments
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.params.attachments = attachments
    this.touch()
  }

  get createdAt() {
    return this.params.createdAt
  }

  get updatedAt() {
    return this.params.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  static create(
    params: Optional<IAnswerParams, 'createdAt' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...params,
        attachments: params.attachments ?? new AnswerAttachmentList(),
        createdAt: params.createdAt ?? new Date(),
      },
      id,
    )

    const isNewAnswer = !id

    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer))
    }

    return answer
  }
}
