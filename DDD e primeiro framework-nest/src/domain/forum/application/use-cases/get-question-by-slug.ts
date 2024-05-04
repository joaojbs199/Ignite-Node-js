import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Injectable } from '@nestjs/common';
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';

interface IGetQuestionBySlugUseCaseParams {
  slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: QuestionDetails;
  }
>;

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questiosRepository: IQuestionsRepository) {}

  async handle({
    slug,
  }: IGetQuestionBySlugUseCaseParams): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questiosRepository.findDetailsBySlug(slug);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    return right({
      question,
    });
  }
}
