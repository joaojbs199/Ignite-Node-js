import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Slug } from './value-objects/slug/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { QuestionAttachment } from './question-attachment'
import { QuestionAttachmentList } from './question-attachment-list'
import { QuestionBestAnswerChosenEvent } from '../events/question-best-answer-chosen-event'

export interface IQuestionParams {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  slug: Slug
  content: string
  attachments: QuestionAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<IQuestionParams> {
  private touch() {
    this.params.updatedAt = new Date()
  }

  get authorId() {
    return this.params.authorId
  }

  get bestAnswerId() {
    return this.params.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    if (bestAnswerId && bestAnswerId !== this.params.bestAnswerId) {
      this.addDomainEvent(new QuestionBestAnswerChosenEvent(this, bestAnswerId))
    }

    this.params.bestAnswerId = bestAnswerId
    this.touch()
  }

  get title() {
    return this.params.title
  }

  set title(title: string) {
    this.params.title = title
    this.params.slug = Slug.createFromText(title)
    this.touch()
  }

  get slug() {
    return this.params.slug
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

  set attachments(attachments: QuestionAttachmentList) {
    this.params.attachments = attachments
    this.touch()
  }

  get createdAt() {
    return this.params.createdAt
  }

  get updatedAt() {
    return this.params.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  static create(
    params: Optional<IQuestionParams, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...params,
        slug: params.slug ?? Slug.createFromText(params.title),
        attachments: params.attachments ?? new QuestionAttachmentList(),
        createdAt: params.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
