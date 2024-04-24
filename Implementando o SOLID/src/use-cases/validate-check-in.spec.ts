import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { randomUUID } from 'crypto';
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error';
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe('Validate Check In use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate check in', async () => {
    const newCheckIn = await checkInsRepository.create({
      gym_id: randomUUID(),
      user_id: randomUUID(),
    });

    const { checkIn } = await sut.handle({
      checkInId: newCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate inexistent check in', async () => {
    await expect(() =>
      sut.handle({
        checkInId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40, 0));

    const newCheckIn = await checkInsRepository.create({
      gym_id: randomUUID(),
      user_id: randomUUID(),
    });

    /**
     * Time in milisseconds.
     */
    const twentyOneMinutesForward = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesForward);

    await expect(() =>
      sut.handle({
        checkInId: newCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
