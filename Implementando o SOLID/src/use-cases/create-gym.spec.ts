import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from '@/use-cases/create-gym';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await sut.handle({
      title: 'Academia teste',
      description: 'Academia para testes',
      phone: '33999999999',
      latitude: -44.1234567,
      longitude: -22.1234567,
    });

    expect(gym).toMatchObject({
      id: expect.any(String),
      title: 'Academia teste',
      description: 'Academia para testes',
      phone: '33999999999',
    });
  });
});
