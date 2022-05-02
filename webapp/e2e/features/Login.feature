Feature: Registering a new user

Scenario: The user is registered in the site
  Given A registered user
  When I fill the data in the form and press submit
  Then Profile page with username should be shown in the screen