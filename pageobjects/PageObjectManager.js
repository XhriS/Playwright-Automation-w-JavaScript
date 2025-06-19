const {LoginPage} = require('./LoginPage');
const {ProductIndexPage} = require('./ProductIndexPage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrderConfirmationPage} = require('./OrderConfirmationPage');
const {MyOrdersPage} = require('./MyOrdersPage');

//THIS IS A LIBRARY THAT STORES ALL OF THE PAGES
class PageObjectManager
{
    constructor(page){
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