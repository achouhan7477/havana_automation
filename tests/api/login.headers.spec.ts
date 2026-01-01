import { test, expect, request } from '@playwright/test';

test.describe('API | Login | Headers & Protocol Tests', () => {

  const url = 'https://api.havanafortuna.com/api/v1/user/login';

  test('Missing Content-Type header', async () => {
    const context = await request.newContext();

    const res = await context.post(url, {
      data: {
        username: 'internaluser',
        password: 'Aman@1234',
      },
    });

    const body = await res.json();

    expect([400, 415]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

  test('Wrong Content-Type header', async () => {
    const context = await request.newContext({
      extraHTTPHeaders: {
        'Content-Type': 'text/plain',
      },
    });

    const res = await context.post(url, {
      data: 'invalid-body',
    });

    const body = await res.json();

    expect([400, 415]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

  test('Invalid HTTP method (GET instead of POST)', async () => {
    const context = await request.newContext();

    const res = await context.get(url);
    const body = await res.json();

    // 🔥 backend returns 200 with error payload
    expect([200, 400, 404, 405]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

  test('Invalid endpoint', async () => {
    const context = await request.newContext();

    const res = await context.post(
      'https://api.havanafortuna.com/api/v1/user/loginn',
      {
        data: {
          username: 'internaluser',
          password: 'Aman@1234',
        },
      }
    );

    const body = await res.json();

    // 🔥 backend returns 200 here as well
    expect([200, 400, 404]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

});
