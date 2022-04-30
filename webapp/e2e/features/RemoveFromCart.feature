Feature: Remove products from cart

Scenario: The user removes a proudct from the cart
    Given A product already added to the cart
    When I press de delete button
    Then The cart should be empty