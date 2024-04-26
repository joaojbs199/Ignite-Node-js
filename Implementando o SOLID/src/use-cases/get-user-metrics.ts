import { ICheckInsRepository } from '@/repositories/check-ins-repository';

interface IGetUserMetricsUseCaseParams {
  userId: string;
}

interface IGetUserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async handle({ userId }: IGetUserMetricsUseCaseParams): Promise<IGetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
