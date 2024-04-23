import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUseCase } from '@/use-cases/register';

export const makeRegisterUseCase = () => {
  const usersRepository = new PrismaUsersRepository();
  return new RegisterUseCase(usersRepository);
};
