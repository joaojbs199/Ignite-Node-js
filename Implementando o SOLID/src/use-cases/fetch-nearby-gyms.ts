import type { Gym } from '@prisma/client';
import { IGymsRepository } from '@/repositories/gyms-repository';

interface FetchNearbyGymsUseCaseParams {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async handle({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseParams): Promise<FetchNearbyGymUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
