import { SendNotificationUseCase } from './send-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';

// SUT => System under test

let inMemoryNotificationRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe('Send notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationRepository);
  });

  it('Should be able to send notification', async () => {
    const result = await sut.handle({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.items[0]).toEqual(result.value?.notification);
  });
});
