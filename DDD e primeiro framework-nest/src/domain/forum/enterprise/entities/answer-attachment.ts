import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface IAnswerAttachmentParams {
  answerId: UniqueEntityID;
  attachmentId: UniqueEntityID;
}

export class AnswerAttachment extends Entity<IAnswerAttachmentParams> {
  get answerId() {
    return this.params.answerId;
  }

  get attachmentId() {
    return this.params.attachmentId;
  }

  static create(params: IAnswerAttachmentParams, id?: UniqueEntityID) {
    const answerAttachment = new AnswerAttachment(params, id);

    return answerAttachment;
  }
}
