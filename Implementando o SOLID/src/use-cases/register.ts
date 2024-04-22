import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import type { User } from '@prisma/client';

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle({ name, email, password }: RegisterUseCaseParams): Promise<RegisterUseCaseResponse> {
    // eslint-disable-next-line camelcase
    const password_hash = await hash(password, 10);

    const hasUser = await this.usersRepository.findByEmail(email);

    if (hasUser) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      // eslint-disable-next-line camelcase
      password_hash,
    });

    return { user };
  }
}
