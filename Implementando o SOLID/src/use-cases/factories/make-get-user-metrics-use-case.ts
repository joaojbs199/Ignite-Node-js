import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics';

export const makeGetUserMetricsUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository();
  return new GetUserMetricsUseCase(checkInsRepository);
};
