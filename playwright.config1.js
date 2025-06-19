// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries : 1, //Amount of times the test will be run to try and pass a test when failed
  workers: 2, //Amount of test files being run in parallel. By default, it will be 5.
  //Maximum time one test can run for.
  timeout: 30*1000,
  
  //Timeout for Assertions
  expect:{
    timeout: 5000
  },

  reporter: 'html',
  projects :[{
    name: 'safari execution',
    use: {
      browserName : 'webkit',
      //browserName : 'webkit',
      //browserName : 'firefox'
      headless: true,
      screenshot: 'off',
      trace:'on', //retain-on-failure
      ...devices['iPhone 11'],
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    }
  },
  {
    name: 'chrome execution',
    use: {
      browserName : 'chrome',
      //browserName : 'webkit',
      //browserName : 'firefox'
      headless: false,
      screenshot: 'on',
      trace:'on', //retain-on-failure
      ignoreHttpsErrors: true,
      permissions:['geolocation'],
      video: 'retain-on-failure',
      //viewport: {width:720, height:720} //For mobile friendly sites only
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    }
  }
  ]
  

  ,

});
module.exports = config

