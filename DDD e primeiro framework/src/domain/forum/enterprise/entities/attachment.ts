import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AttachmentParams {
  title: string
  link: string
}

export class Attachment extends Entity<AttachmentParams> {
  get title() {
    return this.params.title
  }

  get link() {
    return this.params.link
  }

  static create(params: AttachmentParams, id?: UniqueEntityID) {
    const attachment = new Attachment(params, id)

    return attachment
  }
}
