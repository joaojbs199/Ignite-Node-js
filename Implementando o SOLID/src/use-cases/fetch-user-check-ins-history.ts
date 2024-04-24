import { ICheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';

interface IFetchUserCheckInsHistoryUseCaseParams {
  userId: string;
  page: number;
}

interface IFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async handle({
    userId,
    page,
  }: IFetchUserCheckInsHistoryUseCaseParams): Promise<IFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

    return { checkIns };
  }
}
