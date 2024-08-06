import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { SearchPage } from '../pages/searchPage';
import * as testData from './testdata/testData.json';

test.describe('Search Feature Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    await loginPage.login(testData.validUser.email, testData.validUser.password, true);
  });

  test('Search for an available item and click suggestion', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.searchItem(testData.searchItems.availableItem);
    await searchPage.clickSuggestion(testData.searchItems.availableItem);
    await expect(page.getByText('Home / Computers / Notebooks')).toBeVisible();
    await expect(page.getByText('Apple MacBook Pro 13-inchA')).toBeVisible();
  });

  test('Search for an available item, but don’t click suggestion and verify that search page is shown', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.searchItem(testData.searchItems.anotherAvailableItem);
    await searchPage.clickSearchButton();
    await searchPage.checkSearchResultsVisible();
  });

  test('Search for an unavailable item and verify the message', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.searchItem(testData.searchItems.unavailableItem);
    await searchPage.clickSearchButton();
    await searchPage.checkNoProductsFound();
    await searchPage.searchItem(testData.searchItems.specialCharItem);
    await searchPage.clickSearchButton();
    await searchPage.checkNoProductsFound();
  });

  test('Advanced search', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.performAdvancedSearch(
      testData.searchItems.advancedSearchItem,
      testData.searchItems.category,
      testData.searchItems.manufacturer
    );
    await searchPage.checkAdvancedSearchResults();
  });
});