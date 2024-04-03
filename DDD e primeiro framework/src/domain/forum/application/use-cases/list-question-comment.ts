import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { Either, right } from '@/core/either'

interface IListQuestionCommentsUserCaseParams {
  questionId: string
  page: number
}

type ListQuestionCommentsUserCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class ListQuestionCommentsUserCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async handle({
    page,
    questionId,
  }: IListQuestionCommentsUserCaseParams): Promise<ListQuestionCommentsUserCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
