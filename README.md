## Overview

This document outlines the end-to-end test cases for the nopCommerce frontend hosted at https://demo.nopcommerce.com.

# Tool Used
Playwright

**Project Structure:**

This project is organized into the following directories:

_pages/:_ Contains the page object models. Each TypeScript file in this directory represents a page of the application, encapsulating the locators and methods for interacting with that page.
```
•	basePage.ts
•	loginPage.ts
•	searchPage.ts
```
_tests/:_ Contains the test specifications and test data. Each TypeScript file in this directory is a test suite for a specific part of the application.
```
•	loginTests.test.ts
•	searchTests.test.ts
```
The testData/ subdirectory contain JSON file with test data used in the tests.

`testData.json`

# Test Scenarios

Precondition:
Register a new user to proceed with login scenarios.
For every hour the registration is purged due to the demo site limitation. So for login test cases, in case customer account not found error is shown for valid credentials, the user will proceed to register again.

_1. Login Test Cases_

Test Case 1: Invalid credentials should show error
Steps:
Navigate to the login page
Enter the invalid email and password
Submit the form.
Verify that the no account found error is shown.

Test Case 2: Valid email and invalid password should show error
Steps:
Navigate to the login page.
Enter the valid email and wrong password
Submit the form.
Verify that the error message "The credentials provided are incorrect" is displayed.

Test Case 3: Verify login page elements
Steps:
Navigate to the login page
Verify the page elements

Test Case 4: Valid credentials should login successfully
Steps:
Navigate to the login page.
Enter the valid email and password
Submit the form.
Verify login is successful
Logout and verify logout is succeessful

Test Case 5: Verify remember me functionality
Steps:
Navigate to the login page.
Enter the valid email and password and click remember me
Submit the form.
Verify login is successful
Open another tab and launch the URL
Verify that the user is still logged in

_2._Post-Login Action: Search for products_

Test Case 1: Search for an available item and click suggestion
Steps:
Log in and search for an item
Click on the suggestion provided
Verify that the relevant product page is visble

Test Case 2: Search for an available item, but don’t click suggestion
Steps:
Log in and search for an item
Do not click on the suggestion provided, rather click Search button
Verify that search page is visible with relevant list

Test Case 3: Search for an unavailable item and verify the message
Steps:
Log in and search for an item that is unavailable
Verify relevant message is shown- Product not found
Verify special characters in search and check message.

Test Case 4: Advanced search
Steps:
Log in and search for an item click Search button
From advanced search, fill in the specific details
Verify relevant products are shown

# Setup Instructions

Assumption: You have Node.js installed and Playwright configured on your system.

To run all tests, paste the below in the terminal. It will run the tests in headless mode:

`npx playwright test`

To run the tests in headed mode:

`npx playwright test --headed`  or change `headless = false` in `playwright.config.ts` file

To run the specific files :

`npx playwright test <filename.spec.ts> `

To run the specific tests inside the file :

`npx playwright test -g "<testname>"`

To View test reports - Go to the playwright-report folder in the Project directory and open `index.html` file. or run

`npx playwright show-report`

The project configuration and structure follow best practices for Playwright tests, ensuring maintainability and scalability. WebKit and Firefox options are commented out in `playwright.config.ts` file. If needed, please uncomment.

