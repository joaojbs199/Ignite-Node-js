import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { z } from 'zod';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';

const editAnswerBodySchema = z.object({
  content: z.string(),
  attachmentIds: z.array(z.string().uuid()).default([]),
});

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema);

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>;

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const userId = user.sub;
    const { content, attachmentIds } = body;

    const result = await this.editAnswer.handle({
      content,
      authorId: userId,
      attachmentIds,
      answerId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
