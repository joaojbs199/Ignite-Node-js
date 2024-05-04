import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface IAttachmentParams {
  title: string;
  url: string;
}

export class Attachment extends Entity<IAttachmentParams> {
  get title() {
    return this.params.title;
  }

  get url() {
    return this.params.url;
  }

  static create(params: IAttachmentParams, id?: UniqueEntityID) {
    const attachment = new Attachment(params, id);

    return attachment;
  }
}
