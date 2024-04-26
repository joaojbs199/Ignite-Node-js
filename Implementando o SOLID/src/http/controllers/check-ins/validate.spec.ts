import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Validate Check In e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to validate a check in', async () => {
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

    const newCheckIn = await prisma.checkIn.create({
      data: {
        gym_id: newGym.id,
        user_id: user.id,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${newCheckIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(204);

    const validatedCheckIn = await prisma.checkIn.findUnique({
      where: {
        id: newCheckIn.id,
      },
    });

    expect(validatedCheckIn?.validated_at).toEqual(expect.any(Date));
  });
});
