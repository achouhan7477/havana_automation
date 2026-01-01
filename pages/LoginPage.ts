import { Page } from '@playwright/test';

export class LoginPage {
  page: Page;
  usernameInput: string;
  passwordInput: string;
  loginButton: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }

async open() {
  await this.page.goto('https://havanafortuna.com/', {
    waitUntil: 'domcontentloaded', // 🔥 important
    timeout: 90000,               // 🔥 more time
  });
}


  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
