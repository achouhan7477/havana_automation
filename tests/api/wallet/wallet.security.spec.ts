import { test, expect, request } from '@playwright/test';

test.describe('API | Wallet | Security Tests', () => {
  const baseURL = 'https://api.havanafortuna.com';

  test('SQL Injection attempt in query param is handled safely', async () => {
    const context = await request.newContext({ baseURL });

    const res = await context.get(
      "/api/v1/wallet/balance?currency=' OR '1'='1"
    );

    const status = res.status();
    let body: any = {};

    try {
      body = await res.json();
    } catch {
      body = {};
    }

    console.log('SQLi STATUS:', status);
    console.log('SQLi BODY:', body);

    // Backend should NOT break
    expect([400, 401, 403, 404]).toContain(status);
    expect(body).toBeTruthy();
  });

  test('XSS payload in query param is neutralized', async () => {
    const context = await request.newContext({ baseURL });

    const res = await context.get(
      "/api/v1/wallet/balance?currency=<script>alert('xss')</script>"
    );

    const status = res.status();
    let body: any = {};

    try {
      body = await res.json();
    } catch {
      body = {};
    }

    console.log('XSS STATUS:', status);
    console.log('XSS BODY:', body);

    expect([400, 401, 403, 404]).toContain(status);
    expect(body).toBeTruthy();
  });

  test('Special characters payload does not crash wallet API', async () => {
    const context = await request.newContext({ baseURL });

    const res = await context.get(
      '/api/v1/wallet/balance?currency=!@#$%^&*()_+{}|:"<>?'
    );

    const status = res.status();
    let body: any = {};

    try {
      body = await res.json();
    } catch {
      body = {};
    }

    console.log('SPECIAL STATUS:', status);
    console.log('SPECIAL BODY:', body);

    expect([400, 401, 403, 404]).toContain(status);
    expect(body).toBeTruthy();
  });

  test('Unicode characters are handled safely', async () => {
    const context = await request.newContext({ baseURL });

    const res = await context.get(
      '/api/v1/wallet/balance?currency=₹€¥₿'
    );

    const status = res.status();
    let body: any = {};

    try {
      body = await res.json();
    } catch {
      body = {};
    }

    console.log('UNICODE STATUS:', status);
    console.log('UNICODE BODY:', body);

    expect([400, 401, 403, 404]).toContain(status);
    expect(body).toBeTruthy();
  });
});
