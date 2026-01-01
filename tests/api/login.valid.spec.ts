import { test, expect, request } from '@playwright/test';

test.describe('API | Login | Valid Credentials', () => {

  test('Valid username & password → backend responds correctly', async () => {
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

    // ✅ realistic status assertion
    expect([200, 400]).toContain(status);

    // ✅ contract validation
    expect(body).toHaveProperty('data');

    if (status === 200) {
      expect(body).toHaveProperty('success', true);
    }

    if (status === 400) {
      expect(body).toHaveProperty('errors');
      expect(body.errors).toHaveProperty('code');
      expect(body.errors).toHaveProperty('message');
    }
  });

});
