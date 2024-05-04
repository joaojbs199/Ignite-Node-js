import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ValueObject } from '@/core/entities/value-object';

export interface CommentWithAuthorParams {
  commentId: UniqueEntityID;
  content: string;
  authorId: UniqueEntityID;
  author: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class CommentWithAuthor extends ValueObject<CommentWithAuthorParams> {
  get commentId() {
    return this.params.commentId;
  }

  get content() {
    return this.params.content;
  }

  get authorId() {
    return this.params.authorId;
  }

  get author() {
    return this.params.author;
  }

  get createdAt() {
    return this.params.createdAt;
  }

  get updatedAt() {
    return this.params.updatedAt;
  }

  static create(params: CommentWithAuthorParams) {
    return new CommentWithAuthor(params);
  }
}
