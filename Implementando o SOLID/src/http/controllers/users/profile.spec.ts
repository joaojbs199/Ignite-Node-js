import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Profile e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john_doe@test.com',
      password: 'testpass',
    });

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john_doe@test.com',
      password: 'testpass',
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.status).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john_doe@test.com',
      }),
    );
  });
});
