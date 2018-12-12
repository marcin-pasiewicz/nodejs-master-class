const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config');

const handlers = {};

//HTML Handlers

handlers.index = function(data, callback) {
    if(data.method === 'get') {

        const templateData = {
            'head.title' : 'Uptime Monitoring - Made Simple',
            'head.description' : 'We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we\'ll send you a text to let you know',
            'body.class' : 'index'
        };

        helpers.getTemplate('index', templateData,function (err, str) {
            if(!err && str) {
                helpers.addUniversaleTemplates(str, templateData, function (err, str) {
                    if(!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html')
                    }
                });
            } else {
                callback(500, undefined, 'html')
            }
        })
    } else {
        callback(405, undefined, 'html')
    }
};

handlers.accountCreate = function(data, callback) {
    if(data.method === 'get') {

        const templateData = {
            'head.title' : 'Create an account',
            'head.description' : 'Sing up is easy and only takes few seconds',
            'body.class' : 'accountCreate'
        };

        helpers.getTemplate('accountCreate', templateData,function (err, str) {
            if(!err && str) {
                helpers.addUniversaleTemplates(str, templateData, function (err, str) {
                    if(!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html')
                    }
                });
            } else {
                callback(500, undefined, 'html')
            }
        })
    } else {
        callback(405, undefined, 'html')
    }
};

handlers.accountDeleted = function(data, callback) {
    if(data.method === 'get') {

        const templateData = {
            'head.title' : 'Account Deleted',
            'head.description' : 'Your account has been deleted',
            'body.class' : 'accountDeleted'
        };

        helpers.getTemplate('accountDeleted', templateData,function (err, str) {
            if(!err && str) {
                helpers.addUniversaleTemplates(str, templateData, function (err, str) {
                    if(!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html')
                    }
                });
            } else {
                callback(500, undefined, 'html')
            }
        })
    } else {
        callback(405, undefined, 'html')
    }
};

handlers.sessionCreate = function(data, callback) {
    if(data.method === 'get') {

        const templateData = {
            'head.title' : 'Login to your account',
            'head.description' : 'Please enter your phone number and password to enter your account',
            'body.class' : 'sessionCreate'
        };

        helpers.getTemplate('sessionCreate', templateData,function (err, str) {
            if(!err && str) {
                helpers.addUniversaleTemplates(str, templateData, function (err, str) {
                    if(!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html')
                    }
                });
            } else {
                callback(500, undefined, 'html')
            }
        })
    } else {
        callback(405, undefined, 'html')
    }
};

handlers.sessionDeleted = function(data, callback) {
    if(data.method === 'get') {

        const templateData = {
            'head.title' : 'Logged Out',
            'head.description' : 'You have been logged out',
            'body.class' : 'sessionDeleted'
        };

        helpers.getTemplate('sessionDeleted', templateData,function (err, str) {
            if(!err && str) {
                helpers.addUniversaleTemplates(str, templateData, function (err, str) {
                    if(!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html')
                    }
                });
            } else {
                callback(500, undefined, 'html')
            }
        })
    } else {
        callback(405, undefined, 'html')
    }
};

handlers.accountEdit = function(data, callback) {
    if(data.method === 'get') {

        const templateData = {
            'head.title' : 'Account settings',
            'body.class' : 'accountEdit'
        };

        helpers.getTemplate('accountEdit', templateData,function (err, str) {
            if(!err && str) {
                helpers.addUniversaleTemplates(str, templateData, function (err, str) {
                    if(!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html')
                    }
                });
            } else {
                callback(500, undefined, 'html')
            }
        })
    } else {
        callback(405, undefined, 'html')
    }
};

handlers.checksCreate = function(data, callback) {
    if(data.method === 'get') {

        const templateData = {
            'head.title' : 'Create a new check',
            'body.class' : 'checksCreate'
        };

        helpers.getTemplate('checksCreate', templateData,function (err, str) {
            if(!err && str) {
                helpers.addUniversaleTemplates(str, templateData, function (err, str) {
                    if(!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html')
                    }
                });
            } else {
                callback(500, undefined, 'html')
            }
        })
    } else {
        callback(405, undefined, 'html')
    }
};

handlers.checksList = function(data, callback) {
    if(data.method === 'get') {

        const templateData = {
            'head.title' : 'Dashboard',
            'body.class' : 'checksList'
        };

        helpers.getTemplate('checksList', templateData,function (err, str) {
            if(!err && str) {
                helpers.addUniversaleTemplates(str, templateData, function (err, str) {
                    if(!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html')
                    }
                });
            } else {
                callback(500, undefined, 'html')
            }
        })
    } else {
        callback(405, undefined, 'html')
    }
};

handlers.checksEdit = function(data, callback) {
    if(data.method === 'get') {

        const templateData = {
            'head.title' : 'Check Details',
            'body.class' : 'checksEdit'
        };

        helpers.getTemplate('checksEdit', templateData,function (err, str) {
            if(!err && str) {
                helpers.addUniversaleTemplates(str, templateData, function (err, str) {
                    if(!err && str) {
                        callback(200, str, 'html')
                    } else {
                        callback(500, undefined, 'html')
                    }
                });
            } else {
                callback(500, undefined, 'html')
            }
        })
    } else {
        callback(405, undefined, 'html')
    }
};

handlers.favicon = function(data, callback) {
    if(data.method === 'get') {
        helpers.getStaticAsset('favicon.ico', function (err, data) {
            if(!err && data) {
                callback(200, data, 'favicon')
            } else {
                callback(500)
            }
        })
    } else {
        callback(405)
    }
};

handlers.public = function(data, callback) {
    if(data.method === 'get') {
        const trimmedAssetName = data.trimmedPath.replace('public/','').trim();
        if(trimmedAssetName.length > 0) {
            helpers.getStaticAsset(trimmedAssetName, function (err, data) {
                if(!err && data) {
                    let contentType = 'plain';

                    if(trimmedAssetName.indexOf('.css') > -1) {
                        contentType = 'css'
                    }
                    if(trimmedAssetName.indexOf('.jpg') > -1) {
                        contentType = 'jpg'
                    }
                    if(trimmedAssetName.indexOf('.png') > -1) {
                        contentType = 'png'
                    }
                    if(trimmedAssetName.indexOf('.ico') > -1) {
                        contentType = 'favicon'
                    }
                    callback(200, data, contentType)
                } else {
                    callback(404)
                }
            })
        } else {
            callback(404)
        }
    } else {
        callback(405)
    }
};

//JSON Handlers
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
               _data.read('users', phone, function (err, userData) {
                   if(!err && userData ) {
                       _data.delete('users', phone, function (err) {
                           if (!err) {
                               const userChecks = typeof (userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];
                               const checksToDelete = userChecks.length;
                               if(checksToDelete > 0) {
                                   let checksDeleted = 0;
                                   let deletionErrors = false;

                                   userChecks.forEach(function (checkId) {
                                       _data.delete('checks', checkId, function (err) {
                                           if(err) {
                                               deletionErrors = true;
                                           } else {
                                               checksDeleted++
                                               if(checksDeleted === checksToDelete) {
                                                   if(!deletionErrors) {
                                                       callback(200)
                                                   } else {
                                                       callback(500, {'Error':'Errors encoutered while atempting delete all checks'})
                                                   }
                                               }
                                           }
                                       })
                                   })
                               } else {
                                   callback(200)
                               }
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

handlers._checks.get = function(data,callback){
    const id = typeof(data.queryStringObject.id) === 'string' && data.queryStringObject.id.trim().length === 20 ? data.queryStringObject.id.trim() : false;
    if(id){
        _data.read('checks',id,function(err,checkData){
            if(!err && checkData){
                const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;
                handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
                    if(tokenIsValid){
                        callback(200,checkData);
                    } else {
                        callback(403);
                    }
                });
            } else {
                callback(404);
            }
        });
    } else {
        callback(400,{'Error' : 'Missing required field, or field invalid'})
    }
};

handlers._checks.put = function(data,callback){
    const id = typeof(data.payload.id) === 'string' && data.payload.id.trim().length === 20 ? data.payload.id.trim() : false;
    const protocol = typeof(data.payload.protocol) === 'string' && ['http', 'https'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof (data.payload.url) === 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    const method = typeof(data.payload.method) === 'string' && ['post', 'get', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    const successCodes = typeof (data.payload.successCodes) === 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    const timeoutSeconds = typeof (data.payload.timeoutSeconds) === 'number' && data.payload.timeoutSeconds % 1 ===0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

    if(id) {
        if(protocol || url || method || successCodes || timeoutSeconds) {
            _data.read('checks', id, function (err, checkData) {
                if(!err && checkData) {
                    const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;
                    handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid) {
                        console.log(tokenIsValid)
                      if(tokenIsValid) {
                          if(protocol) {
                              checkData.protocol = protocol;
                          }
                          if(url) {
                              checkData.protocol = url;
                          }
                          if(method) {
                              checkData.protocol = method;
                          }
                          if(successCodes) {
                              checkData.protocol = successCodes;
                          }
                          if(timeoutSeconds) {
                              checkData.protocol = timeoutSeconds;
                          }

                          _data.update('checks', id, checkData, function (err) {
                              if (!err) {
                                  callback(200, checkData)
                              } else {
                                  callback(500, {'Error': 'Could not update the check'})
                              }
                          })
                      } else {
                        callback(403)
                      }
                    })
                } else {
                    callback(400, {'Error' : 'Check id did not exist'})
                }
            })
        } else {
            callback(400, {'Error' : 'Missing fields to update'})
        }
    } else {
        callback(400,{'Error' : 'Missing required field, or field invalid'})
    }
};

handlers._checks.delete = function (data, callback) {
    const id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.trim().length === 20 ? data.queryStringObject.id.trim() : false;

    if (id) {
        const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;

        _data.read('checks', id, function (err, checkData) {
            if(!err && checkData) {
                handlers._tokens.verifyToken(token, checkData.userPhone, function (tokenIsValid) {
                    if(tokenIsValid) {
                        _data.delete('checks', id, function (err) {
                            if (!err) {
                                _data.read('users', checkData.userPhone, function (err, userData) {
                                    if(!err && userData) {
                                        const userChecks = typeof (userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];
                                        const checkPosition = userChecks.indexOf(id);

                                        if(checkPosition > -1) {
                                            userChecks.splice(checkPosition, 1)
                                            _data.update('users', userChecks.userPhone, userData, function (err) {
                                                if (!err) {
                                                    callback(200, )
                                                } else {
                                                    callback(500, {'Error': 'Could not update user'})
                                                }
                                            })
                                        } else {
                                            callback(500, {'Error': 'Could not find check on the user object'})
                                        }

                                    } else {
                                        callback(400, {'Error': 'Could not found the user who created the check'})
                                    }
                                })
                            } else {
                                callback(500, {'Error': 'Could not delete the check data'} )
                            }
                        })
                    } else {
                        callback(403, {'Error': 'Missing required token in header or token is invalid'})
                    }
                })
            } else {
                callback(400, {'Error': 'Could not found specified check id'})
            }
        })
    } else {
        callback(400, {'Error': 'Missing required filed'})
    }
};

handlers.notFound = function (data, callback) {
    callback(404)
};

handlers.ping = function (data, callback) {
    callback(200)
};

module.exports = handlers;