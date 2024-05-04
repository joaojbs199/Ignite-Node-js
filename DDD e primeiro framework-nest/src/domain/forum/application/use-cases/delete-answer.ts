import { Either, left, right } from '@/core/either';
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { Injectable } from '@nestjs/common';

interface IDeleteAnswerUseCaseParams {
  answerId: string;
  authorId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>;

@Injectable()
export class DeleteAnswerUseCase {
  constructor(private questiosRepository: IAnswersRepository) {}

  async handle({
    answerId,
    authorId,
  }: IDeleteAnswerUseCaseParams): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.questiosRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.questiosRepository.delete(answer);

    return right(null);
  }
}
