const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const handlers = require('./handlers');
const helpers = require('./helpers');
const path = require('path');
const util = require('util');
const debug = util.debuglog('server');

const server = {};

server.httpServer = http.createServer(function(req, res) {
    server.unifiedServer(req, res)
});

server.httpsServer = https.createServer(server.httpsServerOptions, function(req, res) {
    server.unifiedServer(req, res)
});

server.httpsServerOptions = {
    'key': fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
    'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
};

server.unifiedServer = function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    const queryStringObject = parsedUrl.query;
    const method = req.method.toLocaleLowerCase();
    const headers = req.headers;
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data)
    });
    req.on('end', function () {
        buffer += decoder.end();
        let chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJSONToObject(buffer)
        };

        chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;

        try {
            chosenHandler(data, function (statusCode, payload, contentType) {
                server.processHandlerResponse(res, method, trimmedPath, statusCode, payload, contentType);
            })    
        } catch (e) {
            debug(e)
            server.processHandlerResponse(res, method, trimmedPath, 500, {'Error': 'An unknown error has occured'}, 'json');
        }
        
    });
};

server.processHandlerResponse = function(res, method, trimmedPath, statusCode, payload, contentType) {
    statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
    contentType = typeof(contentType) === 'string' ? contentType : 'json';

    let payloadString = '';

    if(contentType === 'json') {
        res.setHeader('Content-Type', 'application/json');
        payload = typeof(payload) === 'object' ? payload : {};
        payloadString = JSON.stringify(payload);
    }

    if(contentType === 'html') {
        res.setHeader('Content-Type', 'text/html');
        payloadString = typeof(payload) === 'string' ? payload : '';
    }

    if(contentType === 'favicon') {
        res.setHeader('Content-Type', 'image/x-icon');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }
    if(contentType === 'css') {
        res.setHeader('Content-Type', 'text/css');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }
    if(contentType === 'png') {
        res.setHeader('Content-Type', 'image/png');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }
    if(contentType === 'jpg') {
        res.setHeader('Content-Type', 'image/jpeg');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }
    if(contentType === 'plain') {
        res.setHeader('Content-Type', 'text/plain');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }

    res.writeHead(statusCode);
    res.end(payloadString);
    if (statusCode === 200) {
        debug('\x1b[32m%s\x1b[0m', method.toUpperCase() + ' /' + trimmedPath+' '+ statusCode);
    } else {
        debug('\x1b[31m%s\x1b[0m', method.toUpperCase() + ' /' + trimmedPath+' '+ statusCode);
    }
};

server.router = {
    '': handlers.index,
    'account/create': handlers.accountCreate,
    'account/edit': handlers.accountEdit,
    'account/deleted': handlers.accountDeleted,
    'session/create': handlers.sessionCreate,
    'session/deleted': handlers.sessionDeleted,
    'checks/all': handlers.checksList,
    'checks/create': handlers.checksCreate,
    'checks/edit': handlers.checksEdit,
    'ping': handlers.ping,
    'api/users': handlers.users,
    'api/tokens': handlers.tokens,
    'api/checks': handlers.checks,
    'favicon.ico': handlers.favicon,
    'public': handlers.public
    'examples/error': handlers.exampleError
};

server.init = function() {
    server.httpServer.listen(config.httpPort, function () {
        console.log('\x1b[36m%s\x1b[0m','server is listening on port ' + config.httpPort);
    });
    server.httpsServer.listen(config.httpsPort, function () {
        console.log('\x1b[35m%s\x1b[0m','server is listening on port ' + config.httpsPort);
    });

};

module.exports = server;