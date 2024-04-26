import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Create Check In e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to create a check in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const newGym = await prisma.gym.create({
      data: {
        title: 'Academia teste',
        description: 'Academia para testes',
        phone: '34888888888',
        latitude: -20.3910775,
        longitude: -43.5037591,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${newGym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -20.3910775,
        longitude: -43.5037591,
      });

    expect(response.status).toEqual(201);
  });
});
