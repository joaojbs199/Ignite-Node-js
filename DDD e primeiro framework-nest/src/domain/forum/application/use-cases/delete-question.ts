import { Either, left, right } from '@/core/either';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { Injectable } from '@nestjs/common';

interface IDeleteQuestionUseCaseParams {
  questionId: string;
  authorId: string;
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>;

@Injectable()
export class DeleteQuestionUseCase {
  constructor(private questiosRepository: IQuestionsRepository) {}

  async handle({
    questionId,
    authorId,
  }: IDeleteQuestionUseCaseParams): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questiosRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.questiosRepository.delete(question);

    return right(null);
  }
}
