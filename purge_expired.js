const fs = require('fs');
const config = require('./config');
const expiresIn = config('EXPIRES_IN');

purgeExpired();

setInterval( () => {
    purgeExpired();
}, config('EXPIRE_CHECK_INTERVAL') * 1000);

function purgeExpired() {
    const currentTimestamp = Math.round(Date.now() / 1000);
    console.log(`Purging expired: ${currentTimestamp}`)

    fs.readdir(__dirname + '/static/exports', (err, files) => {
        if (err) {
            console.log('Error listing exports directory.', err);
            return;
        }

        for (const file of files) {
            const fileTimestamp = Number(file.split('-')[0]);
            if (isNaN(fileTimestamp)) {
                return;
            }

            if (fileTimestamp + expiresIn < currentTimestamp) {
                fs.unlinkSync(`${__dirname}/static/exports/${file}`);
            }
        }
    });
}