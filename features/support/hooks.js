const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
const {PageObjectManager} = require('../../pageobjects/PageObjectManager');


// Before({tags: "@foo"}, async function(){
 Before(async function(){
    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    
    this.poManager = new PageObjectManager(this.page);
    this.countryCode = "ind";
    this.countryName = "India";
    this.expectedConfText = " Thankyou for the order. ";
});

BeforeStep(async function(){

});

AfterStep (async function({result}){
    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path: 'screenshot1.png'});
    }
});

After(async function(){
    console.log("I am the last to execute");
});