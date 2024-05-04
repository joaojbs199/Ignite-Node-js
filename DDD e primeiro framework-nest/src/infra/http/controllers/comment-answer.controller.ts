import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { CommentAnswerUseCase } from '@/domain/forum/application/use-cases/comment-answer';

const commentAnswerBodySchema = z.object({
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(commentAnswerBodySchema);

type CommentAnswerBodySchema = z.infer<typeof commentAnswerBodySchema>;

@Controller('/answers/:answerId/comments')
export class CommentAnswerController {
  constructor(private commentAnswer: CommentAnswerUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CommentAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const userId = user.sub;
    const { content } = body;

    const result = await this.commentAnswer.handle({
      content,
      answerId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
