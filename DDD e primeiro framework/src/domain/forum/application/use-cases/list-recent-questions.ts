import { Question } from '@/domain/forum/enterprise/entities/question'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Either, right } from '@/core/either'

interface IListRecentQuestionsUserCaseParams {
  page: number
}

type ListRecentQuestionsUserCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class ListRecentQuestionsUserCase {
  constructor(private questiosRepository: IQuestionsRepository) {}

  async handle({
    page,
  }: IListRecentQuestionsUserCaseParams): Promise<ListRecentQuestionsUserCaseResponse> {
    const questions = await this.questiosRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}
