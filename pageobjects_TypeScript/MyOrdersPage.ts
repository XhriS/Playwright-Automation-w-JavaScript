import {test, expect, Locator, Page} from '@playwright/test';

export class MyOrdersPage {
    page: Page;
    table: Locator;
    rows: Locator;
    orderDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.table = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderDetails = page.locator(".col-text");
    }

    async searchOrderAndSelect(orderId: any)
    {
        await this.table.waitFor();

        for(let i=0; i<await this.rows.count(); ++i)
        {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId))
            {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

         //ORDER SUMMARY PAGE
        const orderIdDetail = await this.orderDetails.textContent();
        expect(orderId.includes(orderIdDetail)).toBeTruthy();
    }
}
module.exports = {MyOrdersPage};