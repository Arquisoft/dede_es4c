Feature: Register a user in the app

Scenario: Register a user in the app
  Given A unregistered user
  When Fill the data in the form and press submit
  Then Profile page with username and not POD vinculation should be shown in the screen