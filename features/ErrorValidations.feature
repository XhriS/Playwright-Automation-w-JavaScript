Feature: Ecommerce Error validations
  @Validations 
  @foo
  Scenario Outline: Login error
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
        | username           | password       |
        | anshika@gmail.com  | Iamking@000    |
        | hello123@gmail.com  | IamHello@000  |