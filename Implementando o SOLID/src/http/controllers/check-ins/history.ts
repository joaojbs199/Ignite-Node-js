import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const history = async (req: FastifyRequest, reply: FastifyReply) => {
  const searchGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = searchGymsQuerySchema.parse(req.query);

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInHistoryUseCase();

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.handle({
    userId: req.user.sub,
    page,
  });

  return reply.status(201).send({ checkIns });
};
