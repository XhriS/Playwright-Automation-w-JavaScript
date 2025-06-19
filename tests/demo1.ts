import{expect, type Locator, type Page} from '@playwright/test';

let message1 : string = "Hello"; //strict typing
//message1 = 2;

let age : number = 20;
let isActive : boolean = false;

//ARRAYS
let numberArray : number [] = [1,2,3];

let data : any = "This could be anything";
data = 42;

//FUNCTIONS
function addNumbers(a:number,b:number):number
{
    return a+b;
}

addNumbers(3,4);

//OBJECTS
let user: {name:string, age2:number, location:string} = {name:"Bob", age2:34, location:"SA"};
user.location = "Austin";

//CLASSES
class CartPage{
    page:Page;
    cartProducts:Locator;
    productText:Locator;
    cart:Locator;
    orders:Locator;
    checkout:Locator;

    constructor(page:any){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productText =  page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']")
        this.checkout = page.locator("text=Checkout");
    }
}

