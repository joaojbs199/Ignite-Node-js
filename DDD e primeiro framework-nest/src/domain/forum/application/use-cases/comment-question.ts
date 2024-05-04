import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Injectable } from '@nestjs/common';

interface ICommentQuestionUseCaseParams {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment;
  }
>;

@Injectable()
export class CommentQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentRepository: IQuestionCommentsRepository,
  ) {}

  async handle({
    authorId,
    questionId,
    content,
  }: ICommentQuestionUseCaseParams): Promise<CommentQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionCommentRepository.create(questionComment);

    return right({
      questionComment,
    });
  }
}
