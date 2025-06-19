const {test, expect} = require('@playwright/test');

class CheckoutPage
{
    constructor(page)
    {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.username = page.locator(".user__name [type='text']").first();
        this.checkoutButton = page.locator(".action__submit");
    }

    async searchCountryAndSelect(countryCode, countryName)
    {
        await this.country.pressSequentially(countryCode);
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();

        for(let i=0; i<optionsCount; ++i)
        {
           const text = await this.dropdown.locator("button").nth(i).textContent();
            if(text.trim() === countryName)
            {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async verifyUsername(username)
    {
        await expect(this.username).toHaveText(username);
    }

    async commitCheckout()
    {
        await this.checkoutButton.click();
    }

}
module.exports = {CheckoutPage};