const path = require('path');
const fs = require('fs');
const _data = require('./data');
const http = require('http');
const https = require('https');
const helpers = require('./helpers');
const url =require('url');
const _logs = require('./logs');

const workers = {};

workers.loop = function() {
    setInterval(function () {
        workers.gatherAllChecks();
    }, 1000 * 60)
};

workers.log = function(originalCheckData, checkOutcome, state, alertWarranted, timeOfCheck) {
    const logData = {
        'check': originalCheckData,
        'outcome': checkOutcome,
        'state': state,
        'alert': alertWarranted,
        'time': timeOfCheck
    };
    console.log(logData)
    const logString = JSON.stringify(logData);
    const logFileName = originalCheckData.checkId;
    _logs.append(logFileName, logString, function (err) {
        if(!err) {
            console.log('Logging to file succeeded')
        } else {
            console.log('Logging to file failed')
        }
    })
};

workers.gatherAllChecks = function(){
    _data.list('checks', function (err, checks) {
        if(!err && checks && checks.length > 0) {
            checks.forEach(function (checks) {
                _data.read('checks', checks, function (err, originalCheckData) {
                    if(!err && originalCheckData) {
                        workers.validateCheckData(originalCheckData)
                    } else {
                        console.log('Error reading one of check\'s data')
                    }
                })
            })
        } else {
            console.log('Error Could not fing any checks to process')
        }
    })
};

workers.validateCheckData = function(originalCheckData) {
    originalCheckData = typeof(originalCheckData) == 'object' && originalCheckData !== null ? originalCheckData : {};
    originalCheckData.checkId = typeof(originalCheckData.checkId) == 'string' && originalCheckData.checkId.trim().length === 20 ? originalCheckData.checkId.trim() : false;
    originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' && originalCheckData.userPhone.trim().length === 10 ? originalCheckData.userPhone.trim() : false;
    originalCheckData.protocol = typeof(originalCheckData.protocol) == 'string' && ['http','https'].indexOf(originalCheckData.protocol) > -1 ? originalCheckData.protocol : false;
    originalCheckData.url = typeof(originalCheckData.url) == 'string' && originalCheckData.url.trim().length > 0 ? originalCheckData.url.trim() : false;
    originalCheckData.method = typeof(originalCheckData.method) == 'string' &&  ['post','get','put','delete'].indexOf(originalCheckData.method) > -1 ? originalCheckData.method : false;
    originalCheckData.successCodes = typeof(originalCheckData.successCodes) == 'object' && originalCheckData.successCodes instanceof Array && originalCheckData.successCodes.length > 0 ? originalCheckData.successCodes : false;
    originalCheckData.timeoutSeconds = typeof(originalCheckData.timeoutSeconds) == 'number' && originalCheckData.timeoutSeconds % 1 === 0 && originalCheckData.timeoutSeconds >= 1 && originalCheckData.timeoutSeconds <= 5 ? originalCheckData.timeoutSeconds : false;

    originalCheckData.state = typeof(originalCheckData.state) === 'string' && ['up', 'down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';
    originalCheckData.lastChecked = typeof (originalCheckData.lastChecked) === 'number' && originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked : false;

    if(originalCheckData.checkId &&
    originalCheckData.userPhone &&
    originalCheckData.protocol &&
    originalCheckData.url &&
    originalCheckData.method &&
    originalCheckData.successCodes &&
    originalCheckData.timeoutSeconds) {
        workers.performCheck(originalCheckData)
    } else {
        console.log('Error one of a check is not properly formatted skipping it')
    }
};

workers.performCheck = function(originalCheckData) {
    const checkOutcome = {
        'error': false,
        'responseCode' : false
    };

    let outcomeSent = false;
    const parsedUrl = url.parse(originalCheckData.protocol + '://' + originalCheckData.url, true);
    const hostname = parsedUrl.hostname;
    const path = parsedUrl.path;

    const requestDetails = {
        'protocol' : originalCheckData.protocol + ':',
        'hostname': hostname,
        'method': originalCheckData.method.toUpperCase(),
        'path': path,
        'timeout' : originalCheckData.timeoutSeconds * 1000
    }

    const _moduleToUse = originalCheckData.protocol === 'http' ? http : https;
    const req = _moduleToUse.request(requestDetails, function (res) {
        const status = res.statusCode;
        checkOutcome.responseCode = status;
        if(!outcomeSent) {
            workers.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    req.on('error', function (e) {
        checkOutcome.error = {
            'error': true,
            'value': e
        };
        if(!outcomeSent) {
            workers.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    req.on('timeout', function (e) {
        checkOutcome.error = {
            'error': true,
            'value': 'timeout'
        };
        if(!outcomeSent) {
            workers.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    req.end();
};

workers.processCheckOutcome = function(originalCheckData, checkOutcome) {
    const state = !checkOutcome.error && checkOutcome.responseCode && originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1 ? 'up' : 'down';
    const alertWarranted = originalCheckData.lastChecked && originalCheckData.state !== state ? true : false;
    const timeOfCheck = Date.now();
    const newCheckedData = originalCheckData;
    newCheckedData.state = state;
    newCheckedData.lastChecked = timeOfCheck;
    workers.log(originalCheckData, checkOutcome, state, alertWarranted, timeOfCheck);

    _data.update('checks', newCheckedData.checkId, newCheckedData, function (err) {
        if(!err) {
            if(alertWarranted) {
                workers.alertUserToStatusChange(newCheckedData)
            } else {
                console.log('Check outcome does not change, no alert needed')
            }
        } else {
            console.log('Error trying to to save update to one of the checks')
        }
        
    } )
};

workers.alertUserToStatusChange = function(newCheckData) {
    const msg = 'Alert: Your check for ' + newCheckData.method.toUpperCase() + ' ' + newCheckData.protocol + '://' + newCheckData.url + ' is currently ' + newCheckData.state
    helpers.sendTwilioSms(newCheckData.userPhone, msg, function (err) {
        if(!err) {
            console.log('Success user was alerted to their status check, via sms ', msg)
        } else {
            console.log('Error could not send sms alert to user who had a state change ', msg)
        }
    })
};

workers.init = function() {
    workers.gatherAllChecks();
    workers.loop();
};

module.exports = workers;