import { Question } from '@/domain/forum/enterprise/entities/question';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { IQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Injectable } from '@nestjs/common';

interface IEditQuestionUseCaseParams {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
  attachmentIds: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

@Injectable()
export class EditQuestionUseCase {
  constructor(
    private questiosRepository: IQuestionsRepository,
    private questionAttachmentsRepository: IQuestionAttachmentsRepository,
  ) {}

  async handle({
    authorId,
    questionId,
    title,
    content,
    attachmentIds,
  }: IEditQuestionUseCaseParams): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questiosRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId);

    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments);

    const questionAttachments = attachmentIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    questionAttachmentList.update(questionAttachments);

    question.attachments = questionAttachmentList;
    question.title = title;
    question.content = content;

    await this.questiosRepository.save(question);

    return right({
      question,
    });
  }
}
