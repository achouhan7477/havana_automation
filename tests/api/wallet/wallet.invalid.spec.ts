import { test, expect, request } from '@playwright/test';

test.describe('API | Wallet | Invalid & Negative Tests', () => {
  const baseURL = 'https://api.havanafortuna.com';

  test('Invalid endpoint under wallet returns safe error', async () => {
    const context = await request.newContext({ baseURL });

    const res = await context.get('/api/v1/wallet/balanc'); // typo
    const status = res.status();
    let body: any = {};

    try {
      body = await res.json();
    } catch {
      body = {};
    }

    console.log('STATUS:', status);
    console.log('BODY:', body);

    // Casinos often mask routes → 404 is acceptable
    expect([400, 401, 403, 404]).toContain(status);
    expect(body).toBeTruthy();
  });

  test('Wallet endpoint with unexpected query params is handled safely', async () => {
    const context = await request.newContext({ baseURL });

    const res = await context.get('/api/v1/wallet/balance?currency=INVALID');
    const status = res.status();
    let body: any = {};

    try {
      body = await res.json();
    } catch {
      body = {};
    }

    console.log('STATUS:', status);
    console.log('BODY:', body);

    // Without auth, backend may return 401/403/404
    expect([401, 403, 404]).toContain(status);
    expect(body).toBeTruthy();
  });

  test('Wallet endpoint with numeric overflow values does not crash', async () => {
    const context = await request.newContext({ baseURL });

    const res = await context.get('/api/v1/wallet/balance?amount=9999999999999999');
    const status = res.status();
    let body: any = {};

    try {
      body = await res.json();
    } catch {
      body = {};
    }

    console.log('STATUS:', status);
    console.log('BODY:', body);

    // Expect graceful handling
    expect([400, 401, 403, 404]).toContain(status);
    expect(body).toBeTruthy();
  });
});
