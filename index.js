const express = require('express')
const config = require('./config.js');
const bodyParser = require('body-parser');
const multer = require('multer');
const slowDown = require("express-slow-down");
const upload = multer();
let app = express()
const port = config('PORT');

// boot up browser
require('./puppeteer');

require('./purge_expired');

if (config('TRUST_PROXY')) { // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
    app.enable("trust proxy");
}

const speedLimiter = slowDown({
  windowMs: config('RATE_LIMIT_WINDOW') * 60 * 1000,
  delayAfter: config('RATE_LIMIT_DELAY_AFTER'),
  delayMs: config('RATE_LIMIT_DELAY_MS')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('static'))
app.use(speedLimiter);

app = require('./routes').register(app);

app.use(express.static('static'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));