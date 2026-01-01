import { test, expect, request } from '@playwright/test';

test.describe('API | Login | Behaviour & Stability Tests', () => {

  const payload = {
    username: 'internaluser',
    password: 'Aman@1234',
  };

  async function login(context: any) {
    return context.post('/api/v1/user/login', { data: payload });
  }

  test('Multiple sequential login attempts', async () => {
    const context = await request.newContext({
      baseURL: 'https://api.havanafortuna.com',
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });

    for (let i = 0; i < 3; i++) {
      const res = await login(context);
      const body = await res.json();

      expect([200, 400]).toContain(res.status());
      expect(body).toHaveProperty('data');
    }
  });

  test('Rapid login attempts (basic rate-limit check)', async () => {
    const context = await request.newContext({
      baseURL: 'https://api.havanafortuna.com',
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });

    const requests = Array.from({ length: 5 }).map(() =>
      context.post('/api/v1/user/login', { data: payload })
    );

    const responses = await Promise.all(requests);

    for (const res of responses) {
      const body = await res.json();
      expect([200, 400, 429]).toContain(res.status());
      expect(body).toHaveProperty('data');
    }
  });

  test('Login API does not crash under concurrent requests', async () => {
    const context = await request.newContext({
      baseURL: 'https://api.havanafortuna.com',
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });

    const responses = await Promise.all([
      login(context),
      login(context),
      login(context),
    ]);

    for (const res of responses) {
      const body = await res.json();
      expect([200, 400]).toContain(res.status());
      expect(body).toHaveProperty('data');
    }
  });

});
