const {test, expect} = require('@playwright/test');

class OrderConfirmationPage{
    constructor(page)
    {
        this.page = page;
        this.confirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersBtn = page.locator("button[routerlink*='myorders']");
    }

    async verifyConfirmationMessageAndOrderID(text)
    {
        await expect(this.confirmationText).toHaveText(text);
        return this.orderId.textContent();
        
    }

    async navigateToMyOrders()
        {
            await this.myOrdersBtn.click();
        }
    
}
module.exports = {OrderConfirmationPage};