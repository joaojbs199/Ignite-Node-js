import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comment-repository';
import { Either, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';

interface IFetchAnswerCommentsUseCaseParams {
  answerId: string;
  page: number;
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[];
  }
>;

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

  async handle({
    page,
    answerId,
  }: IFetchAnswerCommentsUseCaseParams): Promise<FetchAnswerCommentsUseCaseResponse> {
    const comments = await this.answerCommentsRepository.findManyByAnswerIdWithAuthor(answerId, {
      page,
    });

    return right({
      comments,
    });
  }
}
