const puppeteer = require('puppeteer');

puppeteer.launch({ args: ['--no-sandbox'] }).then(function(browser) {
    global.browser = browser;
    console.log('browser ready');
});