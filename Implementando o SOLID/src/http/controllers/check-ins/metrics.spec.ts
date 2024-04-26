import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Check In Metrics e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to get check ins count', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const newGym = await prisma.gym.create({
      data: {
        title: 'Academia teste',
        description: 'Academia para testes',
        phone: '34888888888',
        latitude: -20.3910775,
        longitude: -43.5037591,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: newGym.id,
          user_id: user.id,
        },
        {
          gym_id: newGym.id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.checkInsCount).toBe(2);
  });
});
