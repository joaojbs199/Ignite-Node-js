import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { SearchGymsUseCase } from '@/use-cases/search-gyms';

export const makeSearchGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository();
  return new SearchGymsUseCase(gymsRepository);
};
