import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { Either, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';

interface IFetchQuestionCommentsUserCaseParams {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsUserCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[];
  }
>;

@Injectable()
export class FetchQuestionCommentsUserCase {
  constructor(private questionCommentsRepository: IQuestionCommentsRepository) {}

  async handle({
    page,
    questionId,
  }: IFetchQuestionCommentsUserCaseParams): Promise<FetchQuestionCommentsUserCaseResponse> {
    const comments = await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
      questionId,
      {
        page,
      },
    );

    return right({
      comments,
    });
  }
}
