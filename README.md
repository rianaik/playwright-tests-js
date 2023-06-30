# playwright-tests-js



## Getting started

- [Setup Nodejs LTS](https://nodejs.org/en/download/) 

Clone project in your desired directory:

         git clone https://github.com/rianaik/playwright-tests-js.git
         npm install

Now setup browsers:

        npx playwright install
        npx playwright install msedge
        npx playwright install-deps (Only for Ubuntu users)

## Run tests

#### To run tests in all browsers (headless mode)

        npx playwright test thrive/ 

#### To run tests in all browsers (debug: with browser-ui)

        npx playwright test thrive/ --debug 

#### To run tests in single browser 

        npx playwright test thrive/ --project chromium  (you can replace chromium with edge or firefox)

#### Check results with report and [trace](https://playwright.dev/docs/trace-viewer) data (Should run this after running tests, if doesnt happen automatically) 

      npx playwright show-report


#### Get Screenshot:

     You will get screenshot after running tests inside screenshots/ directory


## Integrate with vscode (recommended)

- [Setup vscode](https://code.visualstudio.com/docs/setup/setup-overview)
- [Set up playwright with vscode](https://playwright.dev/docs/getting-started-vscode#run-tests-and-show-browsers)
- Open vscode, 
    - go to File --> Open folder --> Select "playwright-tests-js"

## Directory structure

- POM (Page Object Model)
- All test cases are inside e2e directory
- e2e has one directory per module/app  ( e.g. Thrive has its own directory named "thrive")
- Each app directory contains atleast two files:

    - index.js
    - mytestcase.spec.js 
- A page object represents a part of your web application. An e-commerce web application might have a home page, a listings page and a checkout page. Each of them can be represented by page object models.

## Generate code

        cd playwright-tests-js
        npx playwright codegen "[URL]"(You can replace [URL] with your desired URL)



## Github Actions:

Everytime you push, it will run all tests from tests directory in 3 browsers.
After action is completed, You can have screenshots and playwright report in github artifacts

#### How to download artifacts

1. Go to https://github.com/rianaik/playwright-tests-js/actions , you will see following screen:


![](.doc/Action.png?raw=true)

2. Now click on latest action and you will see following screen:

![](.doc/Artifact.png?raw=true)

3. Now you can download playwright-report or screenshots 
