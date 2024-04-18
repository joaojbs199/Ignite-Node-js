import { prisma } from '@/lib/prisma';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';
import { hash } from 'bcryptjs';

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export const registerUseCase = async ({ name, email, password }: RegisterUseCaseParams) => {
  // eslint-disable-next-line camelcase
  const password_hash = await hash(password, 10);

  const hasUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (hasUser) {
    throw new Error('Email already exists.');
  }

  const prismaUsersRepository = new PrismaUsersRepository();
  await prismaUsersRepository.create({
    name,
    email,
    // eslint-disable-next-line camelcase
    password_hash,
  });
};
