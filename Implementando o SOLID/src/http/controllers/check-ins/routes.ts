import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { create } from '@/http/controllers/check-ins/create';
import { validate } from '@/http/controllers/check-ins/validate';
import { history } from '@/http/controllers/check-ins/history';
import { metrics } from '@/http/controllers/check-ins/metrics';

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt);

  app.post('/gyms/:gymId/check-ins', create);
  app.get('/check-ins/history', history);
  app.get('/check-ins/metrics', metrics);
  app.patch('/check-ins/:checkInId/validate', validate);
};
