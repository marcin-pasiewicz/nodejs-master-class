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

helpers.createRandomString = function(strLength) {
    strLength = typeof (strLength) === 'number' && strLength > 0 ? strLength : false;

    if(strLength) {
        const possibleCharacters = 'abcdefghiklmnopqrstvxyz0123456789';
        let str = '';

        for(i = 1; i <= strLength; i ++) {
            str += radnomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        }
        return str
    } else {
        return false
    }
};

module.exports = helpers;