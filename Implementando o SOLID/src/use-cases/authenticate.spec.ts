import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { randomUUID } from 'crypto';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    const password = '123abc';
    // eslint-disable-next-line camelcase
    const password_hash = await hash(password, 10);

    await usersRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'john.doe@test.com',
      // eslint-disable-next-line camelcase
      password_hash,
      created_at: new Date(),
    });

    const { user } = await sut.handle({
      email: 'john.doe@test.com',
      password,
    });

    expect(user).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@test.com',
    });
  });

  it('should not be able to authenticate with wrong email', async () => {
    const password = '123abc';

    await expect(() =>
      sut.handle({
        email: 'john.doe@test.com',
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const password = '123abc';
    // eslint-disable-next-line camelcase
    const password_hash = await hash(password, 10);

    await usersRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'john.doe@test.com',
      // eslint-disable-next-line camelcase
      password_hash,
      created_at: new Date(),
    });

    await expect(() =>
      sut.handle({
        email: 'john.doe@test.com',
        password: '456def',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
