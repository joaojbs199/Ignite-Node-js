import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaQuestionsRepository } from '@/infra/database/prisma/repositories/prisma-questions-repository';
import { PrismaQuestionCommentsRepository } from '@/infra/database/prisma/repositories/prisma-question-comments-repository';
import { PrismaQuestionAttachmentsRepository } from '@/infra/database/prisma/repositories/prisma-question-attachments-repository';
import { PrismaAnswersRepository } from '@/infra/database/prisma/repositories/prisma-answers-repository';
import { PrismaAnswerCommentsRepository } from '@/infra/database/prisma/repositories/prisma-answer-comment-repository';
import { PrismaAnswerAttachmentsRepository } from '@/infra/database/prisma/repositories/prisma-answer-attachments-repository';
import { IQuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { IStudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository';
import { IQuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { IQuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { IAnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comment-repository';
import { IAnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { IAttachmentsRepository } from '@/domain/forum/application/repositories/attachments-reposiotry';
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository';
import { INotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';
import { CacheModule } from '@/infra/cache/cache.module';

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: IQuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: IStudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: IQuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: IQuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: IAnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: IAnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: IAnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: IAttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: INotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    IQuestionsRepository,
    IStudentsRepository,
    IQuestionCommentsRepository,
    IQuestionAttachmentsRepository,
    IAnswersRepository,
    IAnswerCommentsRepository,
    IAnswerAttachmentsRepository,
    IAttachmentsRepository,
    INotificationsRepository,
  ],
})
export class DatabaseModule {}
