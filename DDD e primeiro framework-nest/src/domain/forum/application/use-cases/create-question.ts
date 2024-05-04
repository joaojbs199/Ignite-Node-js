import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Either, right } from '@/core/either';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list';
import { Injectable } from '@nestjs/common';

interface ICreateQuestionUseCaseParams {
  authorId: string;
  title: string;
  content: string;
  attachmentIds: string[];
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questiosRepository: IQuestionsRepository) {}

  async handle({
    authorId,
    title,
    content,
    attachmentIds,
  }: ICreateQuestionUseCaseParams): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    question.attachments = new QuestionAttachmentList(questionAttachments);

    await this.questiosRepository.create(question);

    return right({
      question,
    });
  }
}
