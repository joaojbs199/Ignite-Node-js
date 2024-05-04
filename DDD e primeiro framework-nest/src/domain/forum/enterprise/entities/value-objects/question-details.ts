import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ValueObject } from '@/core/entities/value-object';
import { Slug } from './slug/slug';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';

export interface QuestionDetailsParams {
  questionId: UniqueEntityID;
  authorId: UniqueEntityID;
  author: string;
  title: string;
  content: string;
  slug: Slug;
  attachments: Attachment[];
  bestAnswerId?: UniqueEntityID | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class QuestionDetails extends ValueObject<QuestionDetailsParams> {
  get questionId() {
    return this.params.questionId;
  }

  get authorId() {
    return this.params.authorId;
  }

  get author() {
    return this.params.author;
  }

  get title() {
    return this.params.title;
  }

  get content() {
    return this.params.content;
  }

  get slug() {
    return this.params.slug;
  }

  get attachments() {
    return this.params.attachments;
  }

  get bestAnswerId() {
    return this.params.bestAnswerId;
  }

  get createdAt() {
    return this.params.createdAt;
  }

  get updatedAt() {
    return this.params.updatedAt;
  }

  static create(params: QuestionDetailsParams) {
    return new QuestionDetails(params);
  }
}
