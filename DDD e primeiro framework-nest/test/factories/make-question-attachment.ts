import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  IQuestionAttachmentParams,
  QuestionAttachment,
} from '@/domain/forum/enterprise/entities/question-attachment';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export const makeQuestionAttachment = (
  override: Partial<IQuestionAttachmentParams> = {},
  id?: UniqueEntityID,
) => {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return questionAttachment;
};

@Injectable()
export class QuestionAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionAttachment(
    data: Partial<IQuestionAttachmentParams> = {},
  ): Promise<QuestionAttachment> {
    const questionAttachment = makeQuestionAttachment(data);

    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.attachmentId.toString(),
      },
      data: {
        questionId: questionAttachment.questionId.toString(),
      },
    });

    return questionAttachment;
  }
}
