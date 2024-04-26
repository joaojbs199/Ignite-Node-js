import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export const metrics = async (req: FastifyRequest, reply: FastifyReply) => {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const { chekInsCount } = await getUserMetricsUseCase.handle({
    userId: req.user.sub,
  });

  return reply.status(201).send({ chekInsCount });
};
