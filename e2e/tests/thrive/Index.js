const { expect } = require('@playwright/test');

exports.Index = class Index {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://hiring.hashtagloyalty.com/');
  }

  async addItemsToCart() {
    await this.page.locator('app-product-card').filter({ hasText: 'Kadak Pao (Two)BreadsSteam Baked Bread. Crusty Outside, Soft Inside. Tastes Grea' }).getByRole('button', { name: 'Add to cart' }).click();
    await this.page.locator('app-product-card').filter({ hasText: 'Pasande KebabRollsGarlic Yoghurt , Raw onion, dash of lemon ₹325.00 Add to cart' }).getByRole('button', { name: 'Add to cart' }).click();
    await this.page.getByText('2', { exact: true }).click();
  }

  async removeItemsFromCart() {
    await this.page.locator('app-add-to-cart').filter({ hasText: '₹40.00' }).getByRole('button', { name: '' }).click();
    await this.page.getByRole('button', { name: '' }).click()

  }

  async calculatingTax(intcartPageTotal) {
        //Calculating tax and grand total
        const rate = 0.05;
        const tax = intcartPageTotal * rate;
        return tax;
  }

  async calculatingGrandTotal(intcartPageTotal,tax) {
    const grandTotal = intcartPageTotal + tax;
    return grandTotal;
  }

  async close() {
    await this.page.close();
  }

}