const {test, expect} = require('@playwright/test');
const { request } = require('http');
const { text } = require('stream/consumers');

test('Browser Context Playwright test',async ({browser})=> //Annonymous function. You use curly braces to define parameters as fixtures for Playwright to recognize them as global variables
{


    //Open a new fresh instance of a browser (i.e. incognito/without plugins, cookies, or history)
    const context = await browser.newContext();
    const page = await context.newPage();

    //NETWORK ADD-ON FOR TESTING
    //Block/Abort the response of APIs
    // '**/*' represents any kind of URL (irregular expression). Below, it will abort any images loading on the index page.
    //page.route('**/*.{jpg,png,jpeg}', route=>route.abort());

    //FIELD VARIABLES
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    //NETWORK ADD-ON FOR TESTING
    //track on the console all page request and response
    page.on('request', request=> console.log(request.url()));
    page.on('response', response=> console.log(response.url(), response.status()));


    await page.goto("http://www.rahulshettyacademy.com/loginpagePractise");

    //css, xpath. To type data into fields, you can use type (deprecated) or fill
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());

    //Verify if error message contains the word 'Incorrect'. If it does, the test passes; if not, it fails.
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //Erase field content
    await userName.fill("");

    await userName.fill("rahulshettyacademy");
    await signIn.click();

    //EXTRACT MULTIPLE ELEMENTS OF PAGE
    //To retrieve the 1st element of the product Index Page, you can either use the "first" method or the nth(0) or nth(1) method to get the 2nd element as shown below
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
});



//Write test.only to just run this test
test('@Web Page Context Playwright test',async ({page})=> //Annonymous function. You use curly braces to define parameters as fixtures for Playwright to recognize them as global variables
{
    await page.goto("https://www.google.com");
    //Get Title - assertion
    console.log(await page.title());
    
    //The Expect assertion is by default, programmed to wait 5 seconds to locate the element. If it can't find it, it will fail
    await expect(page).toHaveTitle("Google");

});


//HANDLING UI COMPONENTS (DROPDOWNS, RADIOBUTTONS) WITH PLAYWRIGHT
test('UI Controls',async ({page})=> //Annonymous function. You use curly braces to define parameters as fixtures for Playwright to recognize them as global variables
{
    await page.goto("http://www.rahulshettyacademy.com/loginpagePractise");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click(); //Page will wait for 30 seconds till this button is displayed
    
    //Assertion
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    //Await is coded before the expect method above as the action is part of the 'expect' VS inside the expected action below as it is just verifying the status of the checkbox 
    expect (await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");



    //PlayWright inspector will be invoked and pause the execution of the test
    //await page.pause();
});


//HANDLING CHILD WINDOWS WITH PLAYWRIGHT
test.only('Child Window Handle',async ({browser})=> //Annonymous function. You use curly braces to define parameters as fixtures for Playwright to recognize them as global variables
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    
    await page.goto("http://www.rahulshettyacademy.com/loginpagePractise");
    const documentLink = page.locator("[href*='documents-request']");
    
    //This is an array in which it will execute all of the lines of code within it. Once it does, it comes out of the array and proceeds to execute.
    //If these lines are still pending, it will continue to run them until they are fulfilled (promise is fulfilled). If any of these lines fail, the test case will fail.
    //The return type of this array is a new page which will be stored in the new variable below.
    //Promise method is used when you have a set of events/lines of code you want to run asynchronously
    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), //Listen for any new pages to open
        documentLink.click(), //New page is opened. newPage variable is an array as by clicking the link, it can possibly open more than 1 page.
    ])
    //If by clicking a link the site opens more than 1 page, you can add another variable to the array to store that page, i.e. const [newPage, newPage2]

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    
    await page.locator("#username").type(domain);
    //await page.pause();
    console.log(await page.locator("#username").textContent());

});