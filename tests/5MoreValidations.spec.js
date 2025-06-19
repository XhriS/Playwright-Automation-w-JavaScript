const {test, expect} = require('@playwright/test');

//test.describe.configure({mode: 'parallel'});
//test.describe.configure({mode: 'serial'});
//test.skip (Will skip test)
test("Popup validations", async ({page})=> 
{
    await page.goto("http://www.rahulshettyacademy.com/AutomationPractice");
    //await page.goto("https://google.com");
    //await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //PlayWright's page.on will listen for certain JavaScript popup events to occur
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();

    //How to hover mouse over an element
    await page.locator("#mousehover").hover();

    //How to switch to a frame
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click(); //There are 2 elements but only 1 is visible. This will focus on the element that is visible.
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

});

//HOW TO TAKE A SCREENSHOT
test("@Web Screenshot & Visual Comparison", async ({page})=>
{
    await page.goto("http://www.rahulshettyacademy.com/AutomationPractice");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//HOW TO PERFORM VISUAL TESTING AND USE PLAYWRIGHT TO SEE IF THERE ARE ANY DIFFERENCES BETWEEN CURRENT PAGE AND REFRESHED PAGE(I.E. ON A DIFFERENT DAY)
test("Visual Test", async ({page})=>
{
    await page.goto("http://www.google.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

   
});