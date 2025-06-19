const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base'); //Passing test data as ficture by extending test annotation behavior
const {PageObjectManager} = require('../pageobjects/PageObjectManager');
//Json -> string -> js object
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for(const data of dataSet) //This is used when we want to run a test with multiple data sets. It is not needed when just using 1 entry point.
{
//End to End Test with Page Object Model
test(`@Web Client App Login for ${data.productName}`,async ({page})=> //Annonymous function. You use curly braces to define parameters as fixtures for Playwright to recognize them as global variables
{
    const poManager = new PageObjectManager(page);
    const countryCode = "ind";
    const countryName = "India";
    const expectedConfText = " Thankyou for the order. ";
    const products = page.locator(".card-body");

    //LOGIN PAGE OBJECT - Variables are initialized in the constructor
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password); //Use dataSet.username, dataSet.password for a single entry point

    //DASHBOARD PAGE OBJECT
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    //CART PAGE OBJECT
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.checkoutFromCart();
    
    //CHECKOUT PAGE OBJECT
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.searchCountryAndSelect(countryCode, countryName);
    await checkoutPage.verifyUsername(data.username);
    await checkoutPage.commitCheckout();

    //ORDER CONFIRMATION PAGE
    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    const orderId = await orderConfirmationPage.verifyConfirmationMessageAndOrderID(expectedConfText);    
    console.log(orderId);
    await orderConfirmationPage.navigateToMyOrders();

    //MY ORDERS PAGE OBJECT
    const myOrdersPage = poManager.getMyOrdersPage();
    await myOrdersPage.searchOrderAndSelect(orderId);

});
}

//Customizing your test behavior (interview question - Yes, you can.)
customtest.only(`Client App Login`,async ({page, testDataForOrder})=> //Annonymous function. You use curly braces to define parameters as fixtures for Playwright to recognize them as global variables
{
    const poManager = new PageObjectManager(page);
    const countryCode = "ind";
    const countryName = "India";
    const expectedConfText = " Thankyou for the order. ";
    const products = page.locator(".card-body");

    //LOGIN PAGE OBJECT - Variables are initialized in the constructor
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password); //Use dataSet.username, dataSet.password for a single entry point

    //DASHBOARD PAGE OBJECT
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    //CART PAGE OBJECT
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.checkoutFromCart();

});
