import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { CreateGymUseCase } from '@/use-cases/create-gym';

export const makeCreateGymUseCase = () => {
  const gymsRepository = new PrismaGymsRepository();
  return new CreateGymUseCase(gymsRepository);
};
