const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config');
const handlers = {};

handlers.users = function (data, callback) {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback)
    } else {
        callback(405)
    }
};

handlers._users = {};

handlers._users.post = function (data, callback) {
    const firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    const tosAgreement = typeof(data.payload.tosAgreement) === 'boolean' && data.payload.tosAgreement == true ? true : false;

    if(firstName && lastName && phone && password && tosAgreement){
        _data.read('users',phone,function(err,data){
            if(!err){
                const hashedPassword = helpers.hash(password);

                if(hashedPassword){
                    const userObject = {
                        'firstName' : firstName,
                        'lastName' : lastName,
                        'phone' : phone,
                        'hashedPassword' : hashedPassword,
                        'tosAgreement' : true
                    };

                    _data.create('users',phone,userObject,function(err){
                        if(!err){
                            callback(200);
                        } else {
                            console.log(err);
                            callback(500,{'Error' : 'Could not create the new user'});
                        }
                    });
                } else {
                    callback(500,{'Error' : 'Could not hash the user\'s password.'});
                }

            } else {
                callback(400,{'Error' : 'A user with that phone number already exists'});
            }
        });

    } else {
        callback(400,{'Error' : 'Missing required fields'});
    }

};

handlers._users.get = function (data, callback) {
    const phone = typeof (data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.trim().length === 10 ? data.queryStringObject.phone.trim() : false;

    if (phone) {
        const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
        handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
            console.log(token)
            console.log(tokenIsValid)
            if(tokenIsValid) {
                _data.read('users', phone, function (err, data) {
                    if(!err && data) {
                        delete data.hashedPassword;
                        callback(200, data);
                    } else {
                        callback(404)
                    }
                })
            } else {
                callback(403, {'Error': 'Missing required token in header or token is invalid'})
            }
        });
    } else {
        callback(400, {'Error': 'Missing required filed'})
    }
};

handlers._users.put = function (data, callback) {
    const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
    const firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

    if (phone) {
        if (firstName || lastName || password) {
            const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;

            handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
                if(tokenIsValid) {
                    _data.read('users', phone, function (err, userData) {
                        if(!err && userData) {
                            if (firstName) {
                                userData.firstName = firstName;
                            }
                            if (lastName) {
                                userData.lastName = lastName;
                            }
                            if (password) {
                                userData.hashedPassword  = helpers.hash(password);
                            }
                            _data.update('users', phone, userData, function (err) {
                                if (!err) {
                                    callback(200)
                                } else {
                                    console.log(err);
                                    callback(500, {'Error': 'Could not update the user'});
                                }
                            })
                        } else {
                            callback(400, {'Error': 'Specified user does not exist'})
                        }
                    })
                } else {
                    callback(403, {'Error': 'Missing required token in header or token is invalid'})
                }
            })
        } else {
            callback(400, {'Error': 'Missing fields to update'})
        }
    } else {
        callback(400, {'Error': 'Missing required filed'})
    }

};

handlers._users.delete = function (data, callback) {
    const phone = typeof (data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.trim().length === 10 ? data.queryStringObject.phone.trim() : false;

    if (phone) {
        const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
        handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
           if(tokenIsValid) {
               _data.read('users', phone, function (err, data) {
                   if(!err && data) {
                       _data.delete('users', phone, function (err) {
                           if (!err) {
                               callback(200, )
                           } else {
                               callback(500, {'Error': 'Could not delete specified user'})
                           }
                       })
                   } else {
                       callback(400, {'Error': 'Could not found specified user'})
                   }
               })
           } else {
               callback(403, {'Error': 'Missing required token in header or token is invalid'})
           }
        })
    } else {
        callback(400, {'Error': 'Missing required filed'})
    }
};

handlers.tokens = function (data, callback) {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._tokens[data.method](data, callback)
    } else {
        callback(405)
    }
};

handlers._tokens = {};

handlers._tokens.post = function(data, callback) {
    const phone = typeof(data.payload.phone) === 'string' && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

    if(phone && password) {
        _data.read('users', phone, function (err, userData) {
            if(!err && userData) {
                const hashedPassword = helpers.hash(password);

                if(hashedPassword === userData.hashedPassword) {
                    const tokenId = helpers.createRandomString(20);
                    const expires = Date.now() + 1000 * 60 * 60;
                    const tokenObject = {
                        'phone': phone,
                        'id': tokenId,
                        'expires': expires
                    };

                    _data.create('tokens', tokenId, tokenObject, function (err) {
                        if(!err) {
                            callback(200, tokenObject)
                        } else {
                            callback(500, {'Error': 'Could not create new token'})
                        }
                    })
                } else {
                    callback(400, {'Error': 'Password did not match specified users stored password'})
                }
            } else {
                callback(400, {'Error': 'Could not found specified user'})
            }
        })
    } else {
        callback(400, {'Error': 'Missing required filed'})
    }
};

handlers._tokens.get = function(data, callback) {
    const id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.trim().length === 20 ? data.queryStringObject.id.trim() : false;

    if (id) {
        _data.read('tokens', id, function (err, tokenData) {
            if(!err && tokenData) {
                callback(200, tokenData);
            } else {
                callback(404)
            }
        })
    } else {
        callback(400, {'Error': 'Missing required filed'})
    }
};

handlers._tokens.put = function(data, callback) {
    const id = typeof (data.payload.id) === 'string' && data.payload.id.trim().length === 20 ? data.payload.id.trim() : false;
    const extend = typeof (data.payload.extend) === 'boolean' && data.payload.extend === true;

    if(id && extend) {
        _data.read('tokens', id, function (err, tokenData) {
            if(!err && tokenData) {
                if(tokenData.expires > Date.now()) {
                    tokenData.expires = Date.now() + 1000 *60 * 60;
                    _data.update('tokens', id, tokenData, function (err) {
                        if(!err) {
                            callback(200)
                        } else {
                            callback(400, {'Error': 'Could not update token\'s expiration'})
                        }
                    })
                } else {
                    callback(400, {'Error': 'Token has already expired and cannot be extended'})
                }
            } else {
                callback(400, {'Error': 'Specified token does not exist'})
            }
        })
    } else {
        callback(400, {'Error': 'Missing required fields or fields are invalid'})
    }
};

handlers._tokens.delete = function(data, callback) {
    const id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.trim().length === 20 ? data.queryStringObject.id.trim() : false;

    if (id) {
        _data.read('tokens', id, function(err, data) {
            if(!err && data) {
                _data.delete('tokens', id, function (err) {
                    if (!err) {
                        callback(200)
                    } else {
                        callback(500, {'Error': 'Could not delete specified token'})
                    }
                })
            } else {
                callback(400, {'Error': 'Could not found specified token'})
            }
        })
    } else {
        callback(400, {'Error': 'Missing required filed'})
    }
};

handlers._tokens.verifyToken = function(id, phone, callback) {
   _data.read('tokens', id, function (err, tokenData) {
       if(!err && tokenData) {
           if(tokenData.phone === phone && tokenData.expires > Date.now()) {
               callback(true)
           }
       } else {
           callback(false)
       }
   })
};

handlers.checks = function (data, callback) {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._checks[data.method](data, callback)
    } else {
        callback(405)
    }
};

handlers._checks = {};

handlers._checks.post = function(data, callback) {
    const protocol = typeof(data.payload.protocol) === 'string' && ['http', 'https'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof (data.payload.url) === 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    const method = typeof(data.payload.method) === 'string' && ['post', 'get', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    const successCodes = typeof (data.payload.successCodes) === 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    const timeoutSeconds = typeof (data.payload.timeoutSeconds) === 'number' && data.payload.timeoutSeconds % 1 ===0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

    if(protocol && url && method && successCodes && timeoutSeconds) {
        const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;
        _data.read('tokens', token, function (err, tokenData) {
            if(!err && tokenData) {
                const userPhone = tokenData.phone;
                _data.read('users', userPhone, function (err, userData) {
                    if(!err && userData) {
                        const userChecks = typeof (userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];

                        if(userChecks.length < config.maxChecks) {
                            const checkId = helpers.createRandomString(20);
                            const checkObject = {
                                'checkId': checkId,
                                'userPhone': userPhone,
                                'protocol': protocol,
                                'url': url,
                                'method': method,
                                'successCodes': successCodes,
                                'timeoutSeconds': timeoutSeconds
                            };

                            _data.create('checks', checkId, checkObject, function (err) {
                                if(!err) {
                                    userData.checks = userChecks;
                                    userChecks.push(checkId);

                                    _data.update('users', userPhone, userData, function (err) {
                                        if(!err) {
                                            callback(200, checkObject);
                                        } else {
                                            callback(500,  {'Error': 'Could not update user with the new check'})
                                        }
                                    })
                                } else {
                                    callback(500, {'Error': 'Could not create new check'})
                                }
                            })
                        } else {
                            callback(400, {'Error': 'User already have max number of checks (' +  config.maxChecks + ')'})
                        }
                    } else {
                        callback(403)
                    }
                })
            } else {
                callback(403, {'Error': 'Missing required token in header or token is invalid'})
            }
        })

    } else {
        callback(400, {'Error': 'Missing required inputs or inputs are invalid'})
    }
};

handlers.notFound = function (data, callback) {
    callback(404)
};

handlers.ping = function (data, callback) {
    callback(200)
};

module.exports = handlers;