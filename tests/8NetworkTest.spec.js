const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };//API Payload Data
const orderPayload = { orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
let response;
const fakePayLoadOrders = { data: [], message: "No Orders" };

test.beforeAll(async () => {

    const APIContext = await request.newContext();
    const apiUtils = new APIUtils(APIContext, loginPayload)
    response = await apiUtils.createOrder(orderPayload);
});

test("Place the Order", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client");

    //* will accept any userid/customer
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 

        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
        //Intercepting the response
        //API reponse -> fakeresponse (Playwright is intercepting) -> browser -> render data on front end



    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    console.log(await page.locator(".mt-4").textContent());

    //MY ORDERS PAGE
    //await page.locator("tbody").waitFor();
    //const rows = await page.locator("tbody tr");


});