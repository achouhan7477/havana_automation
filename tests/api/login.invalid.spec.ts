import { test, expect, request } from '@playwright/test';

test.describe('API | Login | Invalid Credentials', () => {

  const basePayload = {
    username: 'internaluser',
    password: 'Aman@1234',
  };

  async function login(payload: any) {
    const context = await request.newContext({
      baseURL: 'https://api.havanafortuna.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    return context.post('/api/v1/user/login', { data: payload });
  }

  test('Wrong password → error response', async () => {
    const res = await login({ ...basePayload, password: 'Wrong@123' });
    const body = await res.json();

    expect(res.status()).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('Wrong username → error response', async () => {
    const res = await login({ ...basePayload, username: 'wronguser' });
    const body = await res.json();

    expect(res.status()).toBe(400);
    expect(body).toHaveProperty('errors');
  });

  test('Empty username → validation error', async () => {
    const res = await login({ ...basePayload, username: '' });
    const body = await res.json();

    expect([400, 422]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

  test('Empty password → validation error', async () => {
    const res = await login({ ...basePayload, password: '' });
    const body = await res.json();

    expect([400, 422]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

  test('Missing password field → validation error', async () => {
    const payload = { username: 'internaluser' };
    const res = await login(payload as any);
    const body = await res.json();

    expect([400, 422]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

});
