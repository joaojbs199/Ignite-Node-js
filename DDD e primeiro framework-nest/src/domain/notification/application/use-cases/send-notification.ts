import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Either, right } from '@/core/either';
import { Notification } from '@/domain/notification/enterprise/entities/notification';
import { INotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

export interface ISendNotificationUseCaseParams {
  recipientId: string;
  title: string;
  content: string;
}

export type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async handle({
    recipientId,
    title,
    content,
  }: ISendNotificationUseCaseParams): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });

    await this.notificationsRepository.create(notification);

    return right({
      notification,
    });
  }
}
