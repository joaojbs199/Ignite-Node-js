import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms';

export const makeFetchNearbyGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository();
  return new FetchNearbyGymsUseCase(gymsRepository);
};
