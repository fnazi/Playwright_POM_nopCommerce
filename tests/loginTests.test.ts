import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import * as testData from './testdata/testData.json';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.ensureValidAccount();
  });
  
  test('Invalid credentials should show error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
    await loginPage.verifyLoginError('Login was unsuccessful. Please correct the errors and try again.No customer account found');
  });

  test('Valid email and invalid password should show error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.validUser.email, testData.invalidPassword);
    await loginPage.verifyLoginError('Login was unsuccessful. Please correct the errors and try again.The credentials provided are incorrect');
  });

  test('Verify login page elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('/login');
    await loginPage.verifyLoginPageElements();
  });

  test('Valid credentials should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.validUser.email, testData.validUser.password, true);
    await loginPage.verifyLoggedIn();
    await loginPage.logout();
    await expect(page.locator('.ico-login')).toBeVisible();
  });

  test('Verify remember me functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.validUser.email, testData.validUser.password, true);
    await loginPage.verifyLoggedIn();
    await loginPage.saveStorageState('state.json');

    const newPage = await page.context().newPage();
    await newPage.goto('/');
    await loginPage.verifyLoggedIn();
  });
});