import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from '@/use-cases/register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register use case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(usersRepository);

    const password = '123abc';
    const { user } = await sut.handle({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password,
    });

    const isHashed = await compare(password, user.password_hash);

    expect(isHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(usersRepository);

    const email = 'john.doe@test.com';
    const password = '123abc';

    await sut.handle({
      name: 'John Doe',
      email,
      password,
    });

    await expect(() =>
      sut.handle({
        name: 'John Doe',
        email,
        password,
      }),
    ).rejects.toThrowError(UserAlreadyExistsError);
  });

  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new RegisterUseCase(usersRepository);

    const { user } = await sut.handle({
      name: 'John Doe',
      email: 'john.doe@test.com',
      password: '123abc',
    });

    expect(user).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@test.com',
    });
  });
});
