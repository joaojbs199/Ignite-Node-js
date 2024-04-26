import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { search } from '@/http/controllers/gyms/search';
import { nearby } from '@/http/controllers/gyms/nearby';
import { create } from '@/http/controllers/gyms/create';

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt);

  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);

  app.post('/gyms', create);
};
