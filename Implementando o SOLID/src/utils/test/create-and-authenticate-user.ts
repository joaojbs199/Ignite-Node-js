import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export const createAndAuthenticateUser = async (app: FastifyInstance, isAdmin = false) => {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john_doe@test.com',
      password_hash: await hash('testpass', 10),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  });

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john_doe@test.com',
    password: 'testpass',
  });

  const { token } = authResponse.body;

  return { token };
};
