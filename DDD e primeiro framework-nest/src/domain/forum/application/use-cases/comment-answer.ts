import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comment-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Injectable } from '@nestjs/common';

interface ICommentAnswerUseCaseParams {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

@Injectable()
export class CommentAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerCommentRepository: IAnswerCommentsRepository,
  ) {}

  async handle({
    authorId,
    answerId,
    content,
  }: ICommentAnswerUseCaseParams): Promise<CommentAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    });

    await this.answerCommentRepository.create(answerComment);

    return right({
      answerComment,
    });
  }
}
