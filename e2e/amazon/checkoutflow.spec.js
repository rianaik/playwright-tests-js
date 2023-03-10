const { test, expect } = require('@playwright/test');

module.exports = function createTests() {
    test.describe.configure({ mode: 'serial' });
    /** @type {import('@playwright/test').Page} */
    let page;
    /** @type {import('@playwright/test').Page} */
    let page1;
    let page1Promise;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('visit amazon.in', async ({ }, testInfo) => {
        await page.goto('https://www.amazon.in/');
    });

    test('search dress', async ({ }, testInfo) => {
        await page.getByPlaceholder('Search Amazon.in').fill('dress');
        await page.getByRole('button', { name: 'Go', exact: true }).click();
    });

    test('select dress', async ({ }, testInfo) => {
        page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Lymio Dresses for Women || Western Dresses for Women || Dress for Women || Dresses (514-516)' }).click();
    });

    test('select size of the dress', async ({ }, testInfo) => {
        page1 = await page1Promise;
        await page1.getByRole('heading', { name: 'Lymio Dresses for Women || Western Dresses for Women || Dress for Women || Dresses (514-516)' }).click();
        await expect(page1.getByRole('heading', { name: 'Lymio Dresses for Women || Western Dresses for Women || Dress for Women || Dresses (514-516)' })).toContainText('Lymio Dresses for Women');
        await page1.locator('#native_dropdown_selected_size_name').selectOption('3,B09R1YHTQB');
        console.log("clicked on size of dress")
    });

    test('add to cart', async ({ }, testInfo) => {
        await page1.getByRole('button', { name: 'Add to Cart' }).click();
        await expect(page1.locator('#NATC_SMART_WAGON_CONF_MSG_SUCCESS')).toContainText('Added to Cart');
        await expect(page1.getByRole('listitem').filter({ hasText: 'Size: L' })).toContainText('L');
    });

    test('go to cart', async ({ }, testInfo) => {
        await page1.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' }).click();
    });

    test('order summary', async ({ }, testInfo) => {
        console.log("The dress price:" + page1.locator('#activeCartViewForm').getByRole('list').getByText('399.00'));
        await expect(page1.locator('#activeCartViewForm').getByRole('list')).toContainText('399.00');

        console.log("The dress size is:" + page1.getByRole('listitem').filter({ hasText: 'Size: L' }));
        await expect(page1.getByRole('listitem').filter({ hasText: 'Size: L' })).toContainText('L');
    });

    test('proceed to buy', async ({ }, testInfo) => {
        await page1.getByRole('button', { name: 'Proceed to checkout' }).click();
        await expect(page1.getByRole('heading', { name: 'Sign in' })).toContainText('Sign in');
        await page1.screenshot({ path: 'screenshots/loginPrompt_screenshot.png', fullPage: true });
    })
};