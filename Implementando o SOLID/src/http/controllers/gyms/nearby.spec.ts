import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Nearby Gyms e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Near gym',
      description: 'Academia para testes near',
      phone: '32111111111',
      latitude: -20.4601855,
      longitude: -45.9492348,
    });

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Far gym',
      description: 'Academia para testes far',
      phone: '33999999999',
      latitude: -20.3910775,
      longitude: -43.5037591,
    });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -20.4498865,
        longitude: -45.9987321,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Near gym',
        description: 'Academia para testes near',
        phone: '32111111111',
      }),
    ]);
  });
});
