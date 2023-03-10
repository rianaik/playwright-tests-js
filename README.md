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

## Run tests for amazon

#### To run tests in all browsers (headless mode)

        npx playwright test amazon/ 

#### To run tests in all browsers (debug: with browser-ui)

        npx playwright test amazon/ --debug 

#### To run tests in single browser 

        npx playwright test amazon/ --project chromium  (you can replace chromium with edge or firefox)

#### Check results with report and [trace](https://playwright.dev/docs/trace-viewer) data (Should run this after running tests, if doesnt happen automatically) 

      npx playwright show-report


#### Get Screenshot:

     You will get screenshot after running tests inside screenshots/ directory


### Github Actions:

Everytime you push, it will run all tests from amazon directory in 3 browsers.
After action is completed, You can have screenshots and playwright report in github artifacts

#### How to download artifacts

1. Go to https://github.com/rianaik/playwright-tests-js/actions , you will see following screen:


![](.doc/Action.png?raw=true)

2. Now click on latest action and you will see following screen:

![](.doc/Artifact.png?raw=true)

3. Now you can download playwright-report or screenshots 


## Integrate with vscode (recommended)

- [Setup vscode](https://code.visualstudio.com/docs/setup/setup-overview)
- [Set up playwright with vscode](https://playwright.dev/docs/getting-started-vscode#run-tests-and-show-browsers)
- Open vscode, 
    - go to File --> Open folder --> Select "playwright-tests-js"

## Directory structure

- All test cases are inside e2e directory
- e2e has one directory per module/app  ( e.g. amazon has its own directory named "amazon")
- Each app directory contains atleast two files:

    - test.list.js (Here we define in which sequence we want to run all test cases)
    - mytestcase.spec.js (This contains multiple test cases) -- You can have as many test spec files as you need, You only need to add it into test.list.js


## Setup new app

- Lets say you want to create tests cases for app named "Flipkart"
- Copy e2e/exampleapp directory to e2e/flipkart (all lower case letters, No special charactors or space)
- Now inside flipkart:
    - rename example1/2.spec.js to your desired name
    - add it to test.list.js
- To run your test cases from commandline:

        cd playwright-tests-js
        npx playwright test flipkart/  




## Generate code

        cd playwright-tests-js
        npx playwright codegen https://amazon.in (You can replace amazon.in with your desired URL)

