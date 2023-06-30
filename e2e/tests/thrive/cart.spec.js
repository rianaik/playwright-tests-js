const { test, expect } = require('@playwright/test');
const { Index } = require('./Index');

const path = require('path');

test.describe.configure({ mode: 'serial' });
test.describe('HashtagLoyalty tests', async () => {
  /** @type {import('@playwright/test').Page} */
  let page;

  let index = new Index();

  test.beforeAll(async ({ browser }) => {
    index = new Index(await browser.newPage());
    page = index.page;
    //index.goto();
  });

  test.afterAll(async () => {
    await index.close();
  });

  test('got and verify has title', async ({ }) => {
    await index.goto();
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('Items are added to cart and Verify', async ({ }) => {
    await index.addItemsToCart(page);
    //Verify if items are visible in cart
    await expect(page.getByText('Kadak Pao (Two)')).toBeVisible();
    await expect(page.getByText('Pasande Kebab')).toBeVisible();

  });

  test('Remove Items from cart and Verify', async ({ }) => {

    await index.removeItemsFromCart();
    //verify if the item is removed from the cart
    await expect(page.getByText('Kadak Pao (Two)')).toBeHidden();
    await expect(page.getByText('Pasande Kebab')).toBeHidden();
    await expect(page.getByText('No items in the Cart!!!')).toBeVisible();

    await page.getByRole('button', { name: 'Order now' }).click();
    //Verify if Home page is there.
    await expect(page.getByText('Welcome')).toBeVisible();
  });


  test('Items are getting filtered by veg.', async ({ }) => {


    await page.getByLabel('Veg').check();

    //Verifying all veg items are there.
    await expect(page.getByText('Kadak Pao (Two)')).toBeVisible();
    await expect(page.getByText('Phulkas (Two)')).toBeVisible();
    await expect(page.getByText('Malabar Paratha (Single)')).toBeVisible();
    await expect(page.getByText('Shami Kebab')).toBeVisible();
    await expect(page.getByText('Shiri\'s Shaami Kebab')).toBeVisible();
    await expect(page.getByText('Sri Lankan Jaffna Curry Full')).toBeVisible();
    await expect(page.getByText('Big basket')).toBeVisible();
    await expect(page.getByText('Bhurani Raita')).toBeVisible();
    await expect(page.getByText('Chilled Baigan Ka Bharta')).toBeVisible();
    await expect(page.getByText('Yellow Daal Tadka')).toBeVisible();
    await expect(page.getByText('Tossed Seasonal Greens')).toBeVisible();
    await expect(page.getByText('Rice Kheer With Salted Caramel')).toBeVisible();
    await expect(page.getByText('Latte')).toBeVisible();
    await page.getByLabel('Veg').uncheck();

  });

  test('Users are able to search for items by name', async ({ }) => {

    await page.getByPlaceholder('Search').fill('kebab');
    await page.keyboard.press('Enter');

    //Verifying
    await expect(page.getByText('Pasande Kebab', { exact: true })).toBeVisible();
    await expect(page.getByText('Shami Kebab')).toBeVisible();
    await expect(page.getByText('Pasande Kebab From The Mughal Courts')).toBeVisible();
    await expect(page.getByText('Shiri\'s Shaami Kebab')).toBeVisible();

    await page.getByPlaceholder('Search').clear();
    await page.keyboard.press('Enter');
  });

  test('Users are able to search for items by category.', async ({ }) => {

    await page.getByPlaceholder('Search').fill('rolls');
    await page.keyboard.press('Enter');

    //Verifying
    await expect(page.getByText('Pasande KebabRollsGarlic Yoghurt , Raw onion, dash of lemon')).toBeVisible();
    await expect(page.getByText('Mutton SukkaRollsCurry Mayo And Pickles')).toBeVisible();
    await expect(page.getByText('Shami KebabRollsFried Onion, Raw Onion, Pickled Onions and a Green Chutney')).toBeVisible();
    await expect(page.getByText('Mutton TikkaRollsGreens, Pickled Veg Salad and a Red Chutney')).toBeVisible();

    await page.getByPlaceholder('Search').clear();
    await page.keyboard.press('Enter');
  });

  test('Users are able to see list in cart', async ({ }) => {
    // call the add to cart function

    await index.addItemsToCart(page);
    //Verify if items are visible in cart
    await expect(page.getByText('Kadak Pao (Two)')).toBeVisible();
    await expect(page.getByText('Pasande Kebab')).toBeVisible();

    await index.removeItemsFromCart(page);
    await expect(page.getByText('No items in the Cart!!!')).toBeVisible();

    await page.getByRole('button', { name: 'Order now' }).click();
    //Verify if Home page is there.
    await expect(page.getByText('Welcome')).toBeVisible();
  });

  test('Item subtotal, taxes applied & grand total are calculated and displayed properly.', async ({ }) => {

    //Getting the price of the items that are being added to cart and then converting it into integer for further processing
    let homePageProduct1 = await page.getByText('₹40.00').first().textContent();
    // @ts-ignore
    const parsedHomePagePrice1 = parseFloat(homePageProduct1.replace(/[^0-9.-]+/g, ''));

    //Getting the price of the items that are being added to cart and then converting it into integer for further processing
    let homePageProductPrice2 = await page.getByText('₹325.00').first().textContent();
    // @ts-ignore
    const parsedHomePagePrice2 = parseFloat(homePageProductPrice2.replace(/[^0-9.-]+/g, ''));


    await index.addItemsToCart();

    //Getting the price of products from Cart page
    let cartProduct1 = await page.getByText('₹40.00').textContent();
    // @ts-ignore
    const parsedCartProductPrice1 = parseFloat(cartProduct1.replace(/[^0-9.-]+/g, ''));
    let cartProduct2 = await page.getByText('₹325.00').textContent();
    // @ts-ignore
    const parsedCartProductPrice2 = parseFloat(cartProduct2.replace(/[^0-9.-]+/g, ''));

    //Verifying if the Price displayed on the Home page for the particular item is same in Cart page.
    if (parsedHomePagePrice1 === parsedCartProductPrice1 && parsedHomePagePrice2 === parsedCartProductPrice2) {
      console.log('The price is same on Home page and Cart page');
    } else {
      console.log('The price is not same on Home page and Cart page');
      test.fail()
    }

    //Adding values for total
    let total = parsedCartProductPrice1 + parsedCartProductPrice2;

    //Cart value
    let cartPageTotal = await page.getByText('₹365.00').textContent();
    // @ts-ignore
    const parsedcartPageTotal = parseFloat(cartPageTotal.replace(/[^0-9.-]+/g, ''));

    //Verifying if the total is same
    if (total === parsedcartPageTotal) {
      console.log('The total is same');
    } else {
      console.log('The total is not same');
      test.fail()
    }

    const tax = await index.calculatingTax(parsedcartPageTotal)
    const grandTotal = await index.calculatingGrandTotal(parsedcartPageTotal,tax)

    console.log("Tax: " + tax);
    console.log("grandTotal: " + grandTotal);

    //Verifying the tax is same
    let cartTax = await page.getByText('₹18.25').textContent();
    // @ts-ignore
    const parsedCartTax = parseFloat(cartTax.replace(/[^0-9.-]+/g, ''));

    //Verifying if the tax is same
    if (tax === parsedCartTax) {
      console.log('The tax is same');
    } else {
      console.log('The tax is not same');
      test.fail()
    }

    let cartGrandTotal = await page.getByText('₹383.25').textContent();
    // @ts-ignore
    const parsedCartGrandTotal = parseFloat(cartGrandTotal.replace(/[^0-9.-]+/g, ''));

    //Verifying if the Grandtotal is same
    if (grandTotal === parsedCartGrandTotal) {
      console.log('The Grand total is same');
    } else {
      console.log('The Grand total is not same');
      test.fail()
    }

  });

  test('Verifying the json when clicking on checkout button', async ({ }) => {
    //index.addItemsToCart();
    var jsonFromOrder;

    page.once('dialog', dialog => {
      jsonFromOrder = ` ${dialog.message()}`.replace('Your order has been successfully placed', '');
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => { });
    });

    await page.getByRole('button', { name: 'Proceed to Payment' }).click();

    const fs = require('fs');

    const relativeFilePath = 'resources/orderDetail.json';
    const filePath = path.join(__dirname, relativeFilePath);


    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      const expectedJson = data;

      // Compare file contents with compareVariable
      if (expectedJson == jsonFromOrder) {
        console.log('File contents are same.');

      } else {
        console.log('File contents do not match');
        test.fail()
      }
    });
  });
});