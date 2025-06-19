Feature: Ecommerce validations
    @Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When I add "ZARA COAT 3" to the cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Entering valid details and placing the order 
    Then Verify the order is present in the order history


    @Validations 
    Scenario Outline: Login error
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
        | username           | password       |
        | anshika@gmail.com  | Iamking@000    |
        | hello123@gmail.com | IamHello@000   |