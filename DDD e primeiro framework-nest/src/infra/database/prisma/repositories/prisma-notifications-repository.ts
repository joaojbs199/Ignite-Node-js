import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaNotificationMapper } from '@/infra/database/prisma/mappers/prisma-notification-mapper';
import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { INotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';

@Injectable()
export class PrismaNotificationsRepository implements INotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistence(notification);

    await this.prisma.notification.create({
      data,
    });
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistence(notification);

    await this.prisma.notification.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
