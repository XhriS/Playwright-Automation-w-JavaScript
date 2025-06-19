const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};//API Payload Data
const orderPayload = {orders: [{country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]}; 
let response;

test.beforeAll( async()=>{
   
   const APIContext = await request.newContext();
   const apiUtils = new APIUtils(APIContext, loginPayload)
   response = await apiUtils.createOrder(orderPayload);
});



test("Client App Login", async ({page})=>
{
    page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, response.token);

    const email="anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client");
   

    await page.locator("button[routerlink*='myorders']").click();

    //MY ORDERS PAGE
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i=0; i<await rows.count(); ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    //ORDER SUMMARY PAGE
    const orderIdDetail = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetail)).toBeTruthy();
    
});