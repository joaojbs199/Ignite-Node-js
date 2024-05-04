import { IAttachmentsRepository } from '@/domain/forum/application/repositories/attachments-reposiotry';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';

export class InMemoryAttachmentsRepository implements IAttachmentsRepository {
  public items: Attachment[] = [];

  async create(attachment: Attachment): Promise<void> {
    this.items.push(attachment);
  }
}
