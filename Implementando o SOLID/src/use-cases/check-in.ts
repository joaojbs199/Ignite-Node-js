import { ICheckInsRepository } from '@/repositories/check-ins-repository';
import { IGymsRepository } from '@/repositories/gyms-repository';
import { CheckIn } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

interface ICheckInUseCaseParams {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface ICheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepopsitory: IGymsRepository,
  ) {}

  async handle({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: ICheckInUseCaseParams): Promise<ICheckInUseCaseResponse> {
    const gym = await this.gymsRepopsitory.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    /**
     * Distance in kilometers.
     */
    const MAX_DISTANCE = 0.1;

    if (distance > MAX_DISTANCE) {
      throw new Error();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      id: randomUUID(),
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
