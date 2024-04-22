import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register';
import { authenticate } from '@/http/controllers/authenticate';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register);
  app.post('/sessions', authenticate);
};
