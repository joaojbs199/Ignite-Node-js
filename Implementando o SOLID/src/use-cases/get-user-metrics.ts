import { ICheckInsRepository } from '@/repositories/check-ins-repository';

interface IGetUserMetricsUseCaseParams {
  userId: string;
}

interface IGetUserMetricsUseCaseResponse {
  chekInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async handle({ userId }: IGetUserMetricsUseCaseParams): Promise<IGetUserMetricsUseCaseResponse> {
    const chekInsCount = await this.checkInsRepository.countByUserId(userId);

    return { chekInsCount };
  }
}
