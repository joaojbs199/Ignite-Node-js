import type { Gym } from '@prisma/client';
import { IGymsRepository } from '@/repositories/gyms-repository';

interface SearchGymsUseCaseParams {
  query: string;
  page: number;
}

interface SearchGymUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async handle({ query, page }: SearchGymsUseCaseParams): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
