import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { IAnswerCommentsRepository } from '../repositories/answer-comment-repository'
import { Either, right } from '@/core/either'

interface IListAnswerCommentsUserCaseParams {
  answerId: string
  page: number
}

type ListAnswerCommentsUserCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class ListAnswerCommentsUserCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async handle({
    page,
    answerId,
  }: IListAnswerCommentsUserCaseParams): Promise<ListAnswerCommentsUserCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
