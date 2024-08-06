import { expect, Page } from '@playwright/test';
import { BasePage } from './basePage';
import * as testData from '../tests/testdata/testData.json';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string, rememberMe: boolean = false) {
    await this.page.goto('/login');
    await this.page.fill('#Email', email);
    await this.page.fill('#Password', password);
    if (rememberMe) {
      await this.page.check('#RememberMe');
    }
    await this.page.click('.login-button');
  }

  async verifyLoginError(errorText: string) {
    await expect(this.page.locator('#main')).toContainText(errorText);
  }

  async verifyLoggedIn() {
    await expect(this.page.getByRole('link', { name: 'My account' }).first()).toBeVisible();
    await expect(this.page.locator('body')).toContainText('Log out');
  }

  async verifyLoginPageElements() {
    await expect(this.page.locator('#main')).toContainText('Returning Customer');
    await expect(this.page.getByLabel('Email:')).toBeVisible();
    await expect(this.page.getByLabel('Password:')).toBeVisible();
    await expect(this.page.getByLabel('Remember me?')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Log in' })).toBeVisible();
  }

  async logout() {
    await this.page.click('a[href="/logout"]');
  }

  async register(email: string, password: string) {
    await this.page.goto('/register');
    await this.page.fill('#FirstName', 'Agritest');
    await this.page.fill('#LastName', 'QA');
    await this.page.fill('#Email', email);
    await this.page.fill('#Password', password);
    await this.page.fill('#ConfirmPassword', password);
    await this.page.click('#register-button');
    //await this.logout();
  }

  async ensureValidAccount() {
    await this.login(testData.validUser.email, testData.validUser.password);
    if (await this.page.isVisible('text=No customer account found')) {
      await this.register(testData.validUser.email, testData.validUser.password);
    }
  }
}