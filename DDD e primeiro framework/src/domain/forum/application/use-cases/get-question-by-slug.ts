import { Question } from '@/domain/forum/enterprise/entities/question'
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

interface IGetQuestionBySlugUserCaseParams {
  slug: string
}

type GetQuestionBySlugUserCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUserCase {
  constructor(private questiosRepository: IQuestionsRepository) {}

  async handle({
    slug,
  }: IGetQuestionBySlugUserCaseParams): Promise<GetQuestionBySlugUserCaseResponse> {
    const question = await this.questiosRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
