import { Either, right } from '@/core/either'
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface IListQuestionAnswersUserCaseParams {
  questionId: string
  page: number
}

type ListQuestionAnswersUserCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class ListQuestionAnswersUserCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async handle({
    page,
    questionId,
  }: IListQuestionAnswersUserCaseParams): Promise<ListQuestionAnswersUserCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({
      answers,
    })
  }
}
