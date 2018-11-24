const crypto = require('crypto');
const config = require('./config');
const https = require('https');
const querystring = require('querystring');

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

helpers.sendTwilioSms = function(phone, msg, callback) {
    phone = typeof(phone) === 'string' && phone.trim().length === 10 ? phone.trim() : false;
    msg = typeof(msg) === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;

    if(phone && msg) {
        const payload = {
            'From': config.twilio.fromPhone,
            'To': '+1'+phone,
            'Body': msg

        };

        const stringPayload = querystring.stringify(payload);
        const requestDetails = {
            'protocol': 'https:',
            'hostname': 'api.twilio.com',
            'method': 'Post',
            'path': '/2010-04-01/Accounts' + config.twilio.accountSid + '/Messages.json',
            'auth': config.twilio.accountSid + ':' + config.twilio.authToken,
            'headers': {
                'Content-Type': 'application/x-form-urlencoded',
                'Content-Length': Buffer.byteLength(stringPayload)
            }
        };

        const req = https.request(requestDetails, function (res) {
            const status =  res.statusCode;
            if(status === 200 && status === 201) {
                callback(false)
            } else {
                callback('Status code returned was ' + status)
            }
        });

        req.on('error', function (e) {
            callback(e)
        });

        req.write(stringPayload);
        req.end()

    } else {
        callback('Given parameters missing or invalid')
    }
};

module.exports = helpers;