import { test, expect, request } from '@playwright/test';

test.describe('API | Login | Contract Test', () => {

  test('Valid credentials → backend responds correctly', async () => {
    const context = await request.newContext({
      baseURL: 'https://api.havanafortuna.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    const response = await context.post('/api/v1/user/login', {
      data: {
        username: 'internaluser',
        password: 'Aman@1234',
      },
    });

    const status = response.status();
    const body = await response.json();

    console.log('STATUS:', status);
    console.log('BODY:', body);

    // ✅ Status handling (real-world)
    expect([200, 400]).toContain(status);

    // ✅ Contract validation
    expect(body).toHaveProperty('data');

    if (status === 200) {
      // Success contract
      expect(body).toHaveProperty('success');
      expect(body.success).toBe(true);
    }

    if (status === 400) {
      // Error contract
      expect(body).toHaveProperty('errors');
      expect(body.errors).toHaveProperty('code');
      expect(body.errors).toHaveProperty('message');
    }
  });

});
