const { request } = require('@playwright/test');

async function loginAPI() {
  const context = await request.newContext({
    baseURL: 'https://api.havanafortuna.com',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });

  const response = await context.post('/api/v1/user/login', {
    data: {
      username: 'internaluser',
      password: 'Aman@1234',
    },
  });

  return response;
}

module.exports = { loginAPI };
