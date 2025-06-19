import { LoginPage } from "./LoginPage";
import { ProductIndexPage } from "./ProductIndexPage";
import {CartPage} from "./CartPage";
import {CheckoutPage} from "./CheckoutPage";
import {OrderConfirmationPage} from "./OrderConfirmationPage";
import {MyOrdersPage} from "./MyOrdersPage";
import {Page} from '@playwright/test';

//THIS IS A LIBRARY THAT STORES ALL OF THE PAGES
export class PageObjectManager
{

    loginPage: LoginPage;
    dashboardPage: ProductIndexPage;
    cartPage: CartPage;
    CheckoutPage : CheckoutPage;
    OrderConfirmationPage: OrderConfirmationPage;
    MyOrdersPage: MyOrdersPage;
    page: Page;

    constructor(page:any){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new ProductIndexPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.CheckoutPage = new CheckoutPage(this.page);
        this.OrderConfirmationPage = new OrderConfirmationPage(this.page);
        this.MyOrdersPage = new MyOrdersPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckoutPage(){
        return this.CheckoutPage;
    }

    getOrderConfirmationPage()
    {
        return this.OrderConfirmationPage;
    }

    getMyOrdersPage()
    {
        return this.MyOrdersPage;
    }
}
module.exports = {PageObjectManager};