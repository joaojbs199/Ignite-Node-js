import { Either, right } from '@/core/either';
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { Injectable } from '@nestjs/common';

interface IListQuestionAnswersUserCaseParams {
  questionId: string;
  page: number;
}

type ListQuestionAnswersUserCaseResponse = Either<
  null,
  {
    answers: Answer[];
  }
>;

@Injectable()
export class FetchQuestionAnswersUserCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async handle({
    page,
    questionId,
  }: IListQuestionAnswersUserCaseParams): Promise<ListQuestionAnswersUserCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    return right({
      answers,
    });
  }
}
