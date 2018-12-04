const crypto = require('crypto');
const config = require('./config');
const https = require('https');
const querystring = require('querystring');
const path = require('path');
const fs = require('fs');

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

helpers.getTemplate = function(templateName, data, callback) {
    templateName = typeof(templateName) === 'string' && templateName.length > 0 ? templateName : false;
    data = typeof (data) === 'object' && data !== null ? data : {};
    if(templateName) {
        const templateDir = path.join(__dirname, '/../templates/');
        fs.readFile(templateDir + templateName + '.html', 'utf8', function (err, str) {
            if(!err && str && str.length > 0) {
                const finalString = helpers.interpolate(str, data);
                callback(false, finalString)
            } else {
                callback('No template could be found')
            }
        })
    } else {
        callback('A valid template name was not specified')
    }
};

helpers.addUniversaleTemplates = function(str, data, callback) {
    str = typeof (str) === 'string' && str.length > 0 ? str : '';
    data = typeof (data) === 'object' && data !== null ? data : {};

    helpers.getTemplate('header', data, function (err, headerString) {
        if(!err && headerString) {
            helpers.getTemplate('footer', data, function (err, footerString) {
                if(!err && footerString) {
                    const fullString = headerString + str + footerString;
                    callback(false, fullString)
                } else {
                    callback('Could not find footer template')
                }
            })
        } else {
            callback('Could not find the header template')
        }
    })
};

helpers.interpolate = function(str, data) {
    str = typeof (str) === 'string' && str.length > 0 ? str : '';
    data = typeof (data) === 'object' && data !== null ? data : {};

    for (let keyName in config.templateGlobals) {
        if(config.templateGlobals.hasOwnProperty(keyName)) {
            data['global.'+keyName] = config.templateGlobals[keyName]
        }
    }

    for(let key in data) {
        if(data.hasOwnProperty(key) && typeof (data[key] === 'string')) {
            let replace = data[key];
            let find = '{'+key+'}';
            str = str.replace(find, replace)
        }
    }
    return str
};

module.exports = helpers;