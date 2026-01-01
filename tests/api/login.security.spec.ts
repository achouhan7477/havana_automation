import { test, expect, request } from '@playwright/test';

test.describe('API | Login | Security Tests', () => {

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

  test('SQL Injection attempt in username', async () => {
    const res = await login({
      username: "' OR 1=1 --",
      password: 'anything',
    });

    const body = await res.json();

    expect([400, 422]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

  test('SQL Injection attempt in password', async () => {
    const res = await login({
      username: 'internaluser',
      password: "' OR 1=1 --",
    });

    const body = await res.json();

    expect([400, 422]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

  test('XSS payload in username', async () => {
    const res = await login({
      username: '<script>alert(1)</script>',
      password: 'test',
    });

    const body = await res.json();

    expect([400, 422]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

  test('Only special characters', async () => {
    const res = await login({
      username: '@@@@####',
      password: '%%%%^^^^',
    });

    const body = await res.json();

    expect([400, 422]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

  test('Unicode characters', async () => {
    const res = await login({
      username: '测试用户',
      password: '密码',
    });

    const body = await res.json();

    expect([400, 422]).toContain(res.status());
    expect(body).toHaveProperty('errors');
  });

});
