import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInUseCase } from '@/use-cases/check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { randomUUID } from 'crypto';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error';
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check In use case', () => {
  const gymId = randomUUID();

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    vi.useFakeTimers();

    await gymsRepository.create({
      id: gymId,
      title: 'Academia teste',
      description: 'Academia para testes',
      phone: '33999999999',
      latitude: -44.1234567,
      longitude: -22.1234567,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.handle({
      userId: randomUUID(),
      gymId,
      userLatitude: -44.1234567,
      userLongitude: -22.1234567,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should notbe able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const userId = randomUUID();

    await sut.handle({
      userId,
      gymId,
      userLatitude: -44.1234567,
      userLongitude: -22.1234567,
    });

    await expect(() =>
      sut.handle({
        userId,
        gymId,
        userLatitude: -44.1234567,
        userLongitude: -22.1234567,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const userId = randomUUID();

    await sut.handle({
      userId,
      gymId,
      userLatitude: -44.1234567,
      userLongitude: -22.1234567,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.handle({
      userId,
      gymId,
      userLatitude: -44.1234567,
      userLongitude: -22.1234567,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    const gymId = randomUUID();

    gymsRepository.items.push({
      id: gymId,
      title: 'Academia teste 2',
      description: 'Academia para testes 2',
      phone: '33111111111',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    });

    await expect(() =>
      sut.handle({
        userId: randomUUID(),
        gymId,
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
