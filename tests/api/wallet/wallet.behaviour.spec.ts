import { test, expect, request } from '@playwright/test';

test.describe('API | Wallet | Behaviour & Stability Tests', () => {
  const baseURL = 'https://api.havanafortuna.com';

  test('Multiple sequential wallet balance calls are handled safely', async () => {
    const context = await request.newContext({ baseURL });

    for (let i = 1; i <= 5; i++) {
      const res = await context.get('/api/v1/wallet/balance');
      const status = res.status();

      console.log(`CALL ${i} STATUS:`, status);

      expect([200, 401, 403, 404]).toContain(status);
    }
  });

  test('Rapid wallet balance calls do not crash backend', async () => {
    const context = await request.newContext({ baseURL });

    const calls = Array.from({ length: 5 }).map(() =>
      context.get('/api/v1/wallet/balance')
    );

    const responses = await Promise.all(calls);

    responses.forEach((res, index) => {
      console.log(`PARALLEL CALL ${index + 1} STATUS:`, res.status());
      expect([200, 401, 403, 404]).toContain(res.status());
    });
  });

  test('Wallet endpoint remains stable under concurrent requests', async () => {
    const context = await request.newContext({ baseURL });

    const concurrentCalls = Array.from({ length: 10 }).map(() =>
      context.get('/api/v1/wallet/balance')
    );

    const results = await Promise.all(concurrentCalls);

    results.forEach((res, index) => {
      console.log(`CONCURRENT ${index + 1} STATUS:`, res.status());
      expect([200, 401, 403, 404]).toContain(res.status());
    });
  });
});
