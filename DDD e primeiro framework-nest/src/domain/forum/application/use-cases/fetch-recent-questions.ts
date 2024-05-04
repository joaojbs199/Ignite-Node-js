import { Question } from '@/domain/forum/enterprise/entities/question';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Either, right } from '@/core/either';
import { Injectable } from '@nestjs/common';

interface IFetchRecentQuestionsUseCaseParams {
  page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[];
  }
>;

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questiosRepository: IQuestionsRepository) {}

  async handle({
    page,
  }: IFetchRecentQuestionsUseCaseParams): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questiosRepository.findManyRecent({ page });

    return right({
      questions,
    });
  }
}
