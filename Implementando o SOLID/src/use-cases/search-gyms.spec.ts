import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from '@/use-cases/search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Academia teste 1',
      description: 'Academia para testes 1',
      phone: '32111111111',
      latitude: -44.1234567,
      longitude: -22.1234567,
    });

    await gymsRepository.create({
      title: 'Academia teste 2',
      description: 'Academia para testes 2',
      phone: '33999999999',
      latitude: -44.1234567,
      longitude: -21.7654321,
    });

    const { gyms } = await sut.handle({
      query: 'teste 2',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: 'Academia teste 2',
        description: 'Academia para testes 2',
        phone: '33999999999',
      }),
    ]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia teste ${i}`,
        description: `Academia para testes ${i}`,
        phone: '32111111111',
        latitude: -44.1234567,
        longitude: -22.1234567,
      });
    }

    const { gyms } = await sut.handle({
      query: 'Academia',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia teste 21' }),
      expect.objectContaining({ title: 'Academia teste 22' }),
    ]);
  });
});
