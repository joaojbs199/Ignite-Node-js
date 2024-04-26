import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/users/register';
import { authenticate } from '@/http/controllers/users/authenticate';
import { profile } from '@/http/controllers/users/profile';
import { verifyJwt } from '@/http/middlewares/verify-jwt';

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  /* Need to be authenticated */
  app.get(
    '/me',
    {
      onRequest: [verifyJwt],
    },
    profile,
  );
};
