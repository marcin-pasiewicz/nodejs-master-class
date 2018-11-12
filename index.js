const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');

const httpServer = http.createServer(function(req, res) {
    unifiedServer(req, res)
});

httpServer.listen(config.httpPort, function () {
    console.log('server is listening on port ' + config.httpPort)
});

const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOptions, function(req, res) {
    unifiedServer(req, res)
});

httpsServer.listen(config.httpsPort, function () {
    console.log('server is listening on port ' + config.httpsPort)
});

const unifiedServer = function (req, res) {
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
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
            payload = typeof(payload) === 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log('Returning this response', statusCode, payloadString);
        })
    });
};

const handlers = {};

handlers.notFound = function (data, callback) {
    callback(404)
};

handlers.ping = function (data, callback) {
    callback(200)
};

const router = {
    'ping': handlers.ping,
};