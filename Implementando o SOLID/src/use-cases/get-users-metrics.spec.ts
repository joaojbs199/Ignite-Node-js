import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { randomUUID } from 'crypto';
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it('should be able to get check ins count', async () => {
    const userId = randomUUID();
    const gymId1 = randomUUID();
    const gymId2 = randomUUID();

    await checkInsRepository.create({
      user_id: userId,
      gym_id: gymId1,
    });

    await checkInsRepository.create({
      user_id: userId,
      gym_id: gymId2,
    });

    const { chekInsCount } = await sut.handle({
      userId,
    });

    expect(chekInsCount).toBe(2);
  });
});
