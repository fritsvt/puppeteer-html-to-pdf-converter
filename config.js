const config = require('./config.json');

module.exports = function(key) {
	key = key.toUpperCase();
	if (process.env[key]) {
		return process.env[key];
	}

	return config[key];
}