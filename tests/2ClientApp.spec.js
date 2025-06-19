const {test, expect} = require('@playwright/test');

//End to End Test
test.only('Browser Context Playwright test',async ({page})=> //Annonymous function. You use curly braces to define parameters as fixtures for Playwright to recognize them as global variables
{
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    
    //Once all API services calls have been completed on the new page and the network is idle, it will look for all of the products displayed on the index page
    //allTextContents method does not have an auto-wait mechanism built into it, so an extra step is needed to synchronize the page
    //await page.waitForLoadState("networkidle");
    //OR
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    
    const count = await products.count();
    for(let i=0; i<count; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            //Add to Cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();

    //Since isVisible() does not have an auto-wait mechanism built into it, waitFor() is needed for the li element to display before it can continue running the code
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //has-text is a pseudoclass within Playwrights. 
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    
    //CHECKOUT PAGE
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();

    for(let i=0; i<count; ++i)
    {
       const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();

    //ORDER CONFIRMATION PAGE
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();

    //MY ORDERS PAGE
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i=0; i<await rows.count(); ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    //ORDER SUMMARY PAGE
    const orderIdDetail = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetail)).toBeTruthy();
});

