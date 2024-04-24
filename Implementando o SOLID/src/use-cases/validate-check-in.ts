import { ICheckInsRepository } from '@/repositories/check-ins-repository';
import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error';

interface IValidateCheckInUseCaseParams {
  checkInId: string;
}

interface IValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async handle({
    checkInId,
  }: IValidateCheckInUseCaseParams): Promise<IValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const checkInCreationTimeDiff = dayjs(new Date()).diff(checkIn.created_at, 'minutes');

    if (checkInCreationTimeDiff > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
