import {test, expect, Locator, Page} from '@playwright/test';

export class CartPage{
    
    cartProducts : Locator;
    productText : Locator;
    cart: Locator;
    orders: Locator;
    checkout: Locator;
    page: Page;


    constructor(page:Page){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productText =  page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']")
        this.checkout = page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName: string){
       await this.cartProducts.waitFor();
       const bool = await this.getProductLocator(productName);
       expect(bool).toBeTruthy();
    }

    async checkoutFromCart()
    {
        await this.checkout.click();
    }

    async getProductLocator(productName: string){
        return this.page.locator("h3:has-text('"+ productName +"')").isVisible();
    }
}
module.exports = {CartPage};