const {test, expect} = require('@playwright/test');

class CartPage{
    
    constructor(page){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productText =  page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']")
        this.checkout = page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName){
       await this.cartProducts.waitFor();
       const bool = await this.getProductLocator(productName);
       expect(bool).toBeTruthy();
    }

    async checkoutFromCart()
    {
        await this.checkout.click();
    }

    async getProductLocator(productName){
        return this.page.locator("h3:has-text('"+ productName +"')").isVisible();
    }
}
module.exports = {CartPage};