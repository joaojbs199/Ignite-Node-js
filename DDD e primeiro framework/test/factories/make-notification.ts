import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  INotificationParams,
  Notification,
} from '@/domain/notification/enterprise/entities/notification'

export const makeNotification = (
  override: Partial<INotificationParams> = {},
  id?: UniqueEntityID,
) => {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notification
}
