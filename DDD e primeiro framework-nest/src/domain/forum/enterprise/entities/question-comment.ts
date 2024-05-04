import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Comment, ICommentParams } from './comment';

export interface IQuestionCommentParams extends ICommentParams {
  questionId: UniqueEntityID;
}

export class QuestionComment extends Comment<IQuestionCommentParams> {
  get questionId() {
    return this.params.questionId;
  }

  static create(params: Optional<IQuestionCommentParams, 'createdAt'>, id?: UniqueEntityID) {
    const questionComment = new QuestionComment(
      {
        ...params,
        createdAt: params.createdAt ?? new Date(),
      },
      id,
    );

    return questionComment;
  }
}
