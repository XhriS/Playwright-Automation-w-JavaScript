const {test, expect} = require('@playwright/test');

test("Calendar validations", async ({page})=>
{
    const month = "6";
    const day = "15";
    const year = "2027";
    const expectedList = [month, day, year];

    await page.goto("http://www.rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    //January starts at 0. Number function converts string into int.
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+day+"']").click();

    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for(let index = 0; index < inputs.length; index++)
    {
        const value = inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }

});