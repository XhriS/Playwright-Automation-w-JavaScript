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
  //Maximum time one test can run for.
  timeout: 30*1000,
  
  //Timeout for Assertions
  expect:{
    timeout: 5000
  },

  reporter: 'html',

  use: {
    browserName : 'chromium',
    //browserName : 'webkit',
    //browserName : 'firefox'
    headless: false,
    screenshot: 'on',
    trace:'on' //retain-on-failure

    

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

});
module.exports = config

