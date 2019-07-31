const fs = require('fs')
const path = './config.json';
let config = {};
if (fs.existsSync(path)) {
    config = require(path);
}

module.exports = function(key) {
    key = key.toUpperCase();
    if (process.env[key]) {
        return process.env[key];
    }

    return config[key];
}