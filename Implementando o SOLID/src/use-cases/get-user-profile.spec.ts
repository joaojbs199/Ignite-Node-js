import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile';
import { randomUUID } from 'crypto';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const password = '123abc';
    // eslint-disable-next-line camelcase
    const password_hash = await hash(password, 10);
    const id = randomUUID();

    await usersRepository.create({
      id,
      name: 'John Doe',
      email: 'john.doe@test.com',
      // eslint-disable-next-line camelcase
      password_hash,
      created_at: new Date(),
    });

    const { user } = await sut.handle({ id });

    expect(user).toMatchObject({
      id,
      name: 'John Doe',
      email: 'john.doe@test.com',
    });
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.handle({
        id: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
