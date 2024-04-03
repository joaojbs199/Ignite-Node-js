import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface INotificationParams {
  recipientId: UniqueEntityID
  title: string
  content: string
  createdAt: Date
  readAt?: Date
}

export class Notification extends Entity<INotificationParams> {
  get recipientId() {
    return this.params.recipientId
  }

  get title() {
    return this.params.title
  }

  get content() {
    return this.params.content
  }

  get createdAt() {
    return this.params.createdAt
  }

  get readAt() {
    return this.params.readAt
  }

  read() {
    this.params.readAt = new Date()
  }

  static create(
    params: Optional<INotificationParams, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const notification = new Notification(
      {
        ...params,
        createdAt: params.createdAt ?? new Date(),
      },
      id,
    )

    return notification
  }
}
