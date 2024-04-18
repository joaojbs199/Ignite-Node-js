import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  // eslint-disable-next-line camelcase
  const password_hash = await hash(password, 10);

  const hasUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (hasUser) {
    return reply.status(409).send();
  }

  await prisma.user.create({
    data: {
      name,
      email,
      // eslint-disable-next-line camelcase
      password_hash,
    },
  });

  return reply.status(201).send();
};
