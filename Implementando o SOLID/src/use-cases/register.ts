import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async handle({ name, email, password }: RegisterUseCaseParams) {
    // eslint-disable-next-line camelcase
    const password_hash = await hash(password, 10);

    const hasUser = await this.usersRepository.findByEmail(email);

    if (hasUser) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      // eslint-disable-next-line camelcase
      password_hash,
    });
  }
}
