import { FastifyReply, FastifyRequest } from 'fastify';

export const verifyUserRole = (roleToVerify: 'ADMIN' | 'MEMBER') => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { role } = req.user;

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' });
    }
  };
};
