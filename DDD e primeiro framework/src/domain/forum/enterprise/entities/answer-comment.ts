import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, ICommentParams } from './comment'

export interface IAnswerCommentParams extends ICommentParams {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<IAnswerCommentParams> {
  get answerId() {
    return this.params.answerId
  }

  static create(
    params: Optional<IAnswerCommentParams, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...params,
        createdAt: params.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
