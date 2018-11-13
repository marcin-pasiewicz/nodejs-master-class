const crypto = require('crypto');
const config = require('./config');

const helpers = {};

helpers.hash = function(str) {
    if(typeof (str) === 'string' && str.length > 0) {
        return hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex')
    } else {
        return false
    }
};

helpers.parseJSONToObject = function (str) {
    try {
        return obj = JSON.parse(str);
    } catch (e) {
        return {};
    }
};

module.exports = helpers;