import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const search = async (req: FastifyRequest, reply: FastifyReply) => {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymsQuerySchema.parse(req.query);

  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymsUseCase.handle({
    query,
    page,
  });

  return reply.status(200).send({ gyms });
};
