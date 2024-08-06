import { Page, expect } from '@playwright/test';

export class SearchPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async searchItem(item: string) {
    await this.page.getByPlaceholder('Search store').click();
    await this.page.getByPlaceholder('Search store').fill(item);
  }

  async clickSearchButton() {
    await this.page.locator('#small-search-box-form button[type="submit"]').click();
  }

  async clickSuggestion(searchTerm: string, retries = 3) {
    const suggestionLocator = this.page.locator('.ui-menu-item-wrapper');

    for (let i = 0; i < retries; i++) {
      try {
        await expect(suggestionLocator.first()).toBeVisible({ timeout: 5000 });
        await suggestionLocator.first().hover();
        await suggestionLocator.first().click();
        return; 
      } catch {
        if (i < retries - 1) {
          await this.page.fill('input[placeholder="Search store"]', searchTerm);
        }
      }
    }
  }

  async checkSearchResultsVisible() {
    await expect(this.page.getByRole('heading', { name: 'Search' })).toBeVisible();
    await expect(this.page.locator('.item-grid')).toBeVisible();
    const productItems = this.page.locator('.product-item');
   // await expect(productItems).toHaveCount(2); // Check that there are 2 items
    await expect(productItems.first()).toBeVisible();
    await expect(productItems.nth(1)).toBeVisible();

  }

  async checkNoProductsFound() {
    await expect(this.page.getByText('No products were found that')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Search' })).toBeVisible();
  }

  async performAdvancedSearch(keyword: string, category: string, manufacturer: string) {
    await this.page.getByPlaceholder('Search store').click();
    await this.page.getByPlaceholder('Search store').fill(keyword);
    await this.clickSearchButton();
    await this.page.getByLabel('Advanced search').check();
    await this.page.getByLabel('Category:').selectOption(category);
    await this.page.getByLabel('Automatically search sub').check();
    await this.page.getByLabel('Manufacturer:').selectOption(manufacturer);
    await this.page.getByLabel('Search In product descriptions').check();
    await this.page.locator('#main').getByRole('button', { name: 'Search' }).click();
  }

  async checkAdvancedSearchResults() {
    await expect(this.page.getByRole('link', { name: 'Nike SB Zoom Stefan Janoski "Medium Mint"', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Nike Floral Roshe Customized Running Shoes', exact: true })).toBeVisible();
    await expect(this.page.locator('div:nth-child(2) > .product-item')).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Nike Floral Roshe Customized Running Shoes', exact: true })).toBeVisible();
    await expect(this.page.locator('.product-item').first()).toBeVisible();
    await expect(this.page.locator('.item-grid')).toBeVisible();
  }
}