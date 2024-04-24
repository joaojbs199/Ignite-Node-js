import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: 'Academia para testes near',
      phone: '32111111111',
      latitude: -20.4601855,
      longitude: -45.9492348,
    });

    await gymsRepository.create({
      title: 'Far gym',
      description: 'Academia para testes far',
      phone: '33999999999',
      latitude: -20.3910775,
      longitude: -43.5037591,
    });

    const { gyms } = await sut.handle({
      userLatitude: -20.4498865,
      userLongitude: -45.9987321,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: 'Near gym',
        description: 'Academia para testes near',
        phone: '32111111111',
      }),
    ]);
  });
});
