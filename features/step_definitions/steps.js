const { When, Then, Given } = require('@cucumber/cucumber')
const { PageObjectManager } = require('../../pageobjects/PageObjectManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');



Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const products = this.page.locator(".card-body");

    //LOGIN PAGE OBJECT - Variables are initialized in the constructor
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);

});

When('I add {string} to the cart', async function (productName) {
    //DASHBOARD PAGE OBJECT
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    //CART PAGE OBJECT
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkoutFromCart();
});

When('Entering valid details and placing the order', async function () {
    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.searchCountryAndSelect(this.countryCode, this.countryName);
    //await checkoutPage.verifyUsername(username);
    await checkoutPage.commitCheckout();
});

Then('Verify the order is present in the order history', async function () {
    //ORDER CONFIRMATION PAGE
    const orderConfirmationPage = this.poManager.getOrderConfirmationPage();
    const orderId = await orderConfirmationPage.verifyConfirmationMessageAndOrderID(this.expectedConfText);
    console.log(orderId);
    await orderConfirmationPage.navigateToMyOrders();

    //MY ORDERS PAGE OBJECT
    const myOrdersPage = this.poManager.getMyOrdersPage();
    await myOrdersPage.searchOrderAndSelect(orderId);
});




//ErrorValidations Feature File
Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator('#username');
    const signIn = this.page.locator('#signInBtn');

    await this.page.goto("http://www.rahulshettyacademy.com/loginpagePractise");

    //css, xpath. To type data into fields, you can use type (deprecated) or fill
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
});

Then('Verify error message is displayed', async function () {
    //Verify if error message contains the word 'Incorrect'. If it does, the test passes; if not, it fails.
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});



