import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface ICommentParams {
  authorId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export abstract class Comment<IParams extends ICommentParams> extends Entity<IParams> {
  private touch() {
    this.params.updatedAt = new Date();
  }

  get authorId() {
    return this.params.authorId;
  }

  get content() {
    return this.params.content;
  }

  set content(content: string) {
    this.params.content = content;
    this.touch();
  }

  get createdAt() {
    return this.params.createdAt;
  }

  get updatedAt() {
    return this.params.updatedAt;
  }
}
