import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  INotificationParams,
  Notification,
} from '@/domain/notification/enterprise/entities/notification';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaNotificationMapper } from '@/infra/database/prisma/mappers/prisma-notification-mapper';

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
  );

  return notification;
};

@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNotification(data: Partial<INotificationParams> = {}): Promise<Notification> {
    const notification = makeNotification(data);

    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPersistence(notification),
    });

    return notification;
  }
}
