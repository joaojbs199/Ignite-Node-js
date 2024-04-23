import { ICheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';
import { randomUUID } from 'crypto';

interface ICheckInUseCaseParams {
  userId: string;
  gymId: string;
}

interface ICheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async handle({ userId, gymId }: ICheckInUseCaseParams): Promise<ICheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      id: randomUUID(),
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
