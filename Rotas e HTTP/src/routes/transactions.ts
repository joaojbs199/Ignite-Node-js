import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import { randomUUID } from 'crypto';

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.post('/', async (req, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['CREDIT', 'DEBIT']),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(req.body);

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'CREDIT' ? amount : amount * -1,
    });

    return reply.status(201).send();
  });

  app.get('/', async (_, reply) => {
    const transactions = await knex('transactions').select();

    return reply.status(200).send({ transactions });
  });

  app.get('/:id', async (req, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTransactionParamsSchema.parse(req.params);

    const transaction = await knex('transactions').where('id', id).first();

    return reply.status(200).send({ transaction });
  });

  app.get('/summary', async (_, reply) => {
    const summary = await knex('transactions')
      .sum('amount', {
        as: 'amount',
      })
      .first();

    return reply.status(200).send({ summary });
  });
};
