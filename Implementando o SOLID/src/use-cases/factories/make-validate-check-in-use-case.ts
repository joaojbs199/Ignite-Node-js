import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in';

export const makeValidateCheckInUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository();
  return new ValidateCheckInUseCase(checkInsRepository);
};
