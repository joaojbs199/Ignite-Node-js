import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Search Gyms e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia teste',
      description: 'Academia para testes',
      phone: '34888888888',
      latitude: -20.3910775,
      longitude: -43.5037591,
    });

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia teste 2',
      description: 'Academia para testes 2',
      phone: '34777777777',
      latitude: -20.3910775,
      longitude: -43.5037591,
    });

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'teste 2',
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Academia teste 2',
        description: 'Academia para testes 2',
        phone: '34777777777',
      }),
    ]);
  });
});
