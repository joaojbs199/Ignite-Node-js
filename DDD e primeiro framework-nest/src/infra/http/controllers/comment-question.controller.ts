import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { CommentQuestionUseCase } from '@/domain/forum/application/use-cases/comment-question';

const commentQuestionBodySchema = z.object({
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(commentQuestionBodySchema);

type CommentQuestionBodySchema = z.infer<typeof commentQuestionBodySchema>;

@Controller('/questions/:questionId/comments')
export class CommentQuestionController {
  constructor(private commentQuestion: CommentQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const userId = user.sub;
    const { content } = body;

    const result = await this.commentQuestion.handle({
      content,
      questionId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
