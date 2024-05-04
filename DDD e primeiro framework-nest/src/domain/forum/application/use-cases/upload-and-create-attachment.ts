import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';
import { IAttachmentsRepository } from '../repositories/attachments-reposiotry';
import { Uploader } from '../storage/uploader';

interface IUploadAndCreateAttachmentUseCaseParams {
  fileName: string;
  fileType: string;
  body: Buffer;
}

type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment;
  }
>;

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentsRepository: IAttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async handle({
    fileName,
    fileType,
    body,
  }: IUploadAndCreateAttachmentUseCaseParams): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    if (!/^image\/(jpeg|jpg|png)$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType));
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    });

    const attachment = Attachment.create({
      title: fileName,
      url,
    });

    await this.attachmentsRepository.create(attachment);

    return right({
      attachment,
    });
  }
}
