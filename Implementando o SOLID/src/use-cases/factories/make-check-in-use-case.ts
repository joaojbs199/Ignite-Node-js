import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/check-in';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export const makeCheckInUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();
  return new CheckInUseCase(checkInsRepository, gymsRepository);
};
