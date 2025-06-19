import {test, expect, Locator, Page} from '@playwright/test';

export class OrderConfirmationPage{
    page: Page;
    confirmationText: Locator;
    orderId: Locator;
    myOrdersBtn: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.confirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersBtn = page.locator("button[routerlink*='myorders']");
    }

    async verifyConfirmationMessageAndOrderID(text: string)
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