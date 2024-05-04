import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Either, right } from '@/core/either';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list';
import { Injectable } from '@nestjs/common';

interface IAnswerQuestionUseCaseParams {
  authorId: string;
  questionId: string;
  attachmentIds: string[];
  content: string;
}

type IAnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

@Injectable()
export class AnswerQuestionUseCase {
  constructor(private answersRepository: IAnswersRepository) {}

  async handle({
    authorId,
    questionId,
    content,
    attachmentIds,
  }: IAnswerQuestionUseCaseParams): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    });

    const answerAttachments = attachmentIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      });
    });

    answer.attachments = new AnswerAttachmentList(answerAttachments);

    await this.answersRepository.create(answer);

    return right({
      answer,
    });
  }
}
