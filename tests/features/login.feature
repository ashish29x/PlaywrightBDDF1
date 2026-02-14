Feature: Login
  In order to access protected areas
  As a registered user
  I want to log in successfully

  Scenario: Successful login with valid credentials
    Given I open the login page
    When I login with valid credentials
    Then I should see the dashboard
