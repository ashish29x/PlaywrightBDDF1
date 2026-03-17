@regression
Feature: Dashboard
  In order to verify user landing page
  As an authenticated user
  I want to view my dashboard summary

  @sanity
  Scenario: View dashboard summary
    Given I am logged in
    When I open the dashboard
    Then I should see the welcome message
