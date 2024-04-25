import { FastifyReply, FastifyRequest } from 'fastify';

export const verifyJwt = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    await req.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' });
  }
};
