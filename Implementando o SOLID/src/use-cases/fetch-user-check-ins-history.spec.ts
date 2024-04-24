import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { randomUUID } from 'crypto';
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe('Fetch User Check In History use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it('should be able to fetch user check in history', async () => {
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

    const { checkIns } = await sut.handle({
      userId,
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: gymId1 }),
      expect.objectContaining({ gym_id: gymId2 }),
    ]);
  });

  it('should be able to fetch paginated user check in history', async () => {
    const userId = randomUUID();

    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: userId,
        gym_id: `${i}`,
      });
    }

    const { checkIns } = await sut.handle({
      userId,
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '21' }),
      expect.objectContaining({ gym_id: '22' }),
    ]);
  });
});
