import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Refresh token e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john_doe@test.com',
      password: 'testpass',
    });

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john_doe@test.com',
      password: 'testpass',
    });

    const cookies = authResponse.get('Set-Cookie') as string[];

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });

    expect(response.get('Set-Cookie')).toEqual([expect.stringContaining('refreshToken=')]);
  });
});
