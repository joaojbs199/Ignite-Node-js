import { FastifyInstance } from 'fastify';
import request from 'supertest';

export const createAndAuthenticateUser = async (app: FastifyInstance) => {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john_doe@test.com',
    password: 'testpass',
  });

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john_doe@test.com',
    password: 'testpass',
  });

  const { token } = authResponse.body;

  return { token };
};
