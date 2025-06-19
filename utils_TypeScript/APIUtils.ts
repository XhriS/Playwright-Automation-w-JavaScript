export class APIUtils
{
    apiContext: any;
    loginPayLoad: string;

    constructor(apiContext: any, loginPayload: string)
    {
        this.apiContext = apiContext; //This last APIContext is coming from the test script and assigning its value to the local APIContext variable in the constructor
        this.loginPayLoad = loginPayload;
    }

     //Accessing the Login API to provide us the session token in order to use it before running our tests
    async getToken()
    {            
        const loginResponse = await this.apiContext.post("http://www.rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data: this.loginPayLoad
        }) //200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    //Order API Access
    async createOrder(orderPayload: string)
    {
        let response = {token : String, orderId: String};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("http://www.rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data : orderPayload,
            headers : {
                        'Authorization' : response.token,
                        'Content-Type' : 'application/json'
            },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0]; //orders is the key value in the Json response with [0] indicating it is in the 1st position
        response.orderId = orderId;
        
        return response;
    }
}
module.exports = {APIUtils};