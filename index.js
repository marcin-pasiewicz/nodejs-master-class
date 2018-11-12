const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

const server = http.createServer(function(req, res) {
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
});

server.listen(config.port, function () {
    console.log('server is listening on port ' + config.port + ' in ' + config.envName + ' mode ' + 'now')
});

const handlers = {};

handlers.sample = function (data, callback) {
    callback(406, {'name': 'sample handler'})
};

handlers.notFound = function (data, callback) {
    callback(404)
};

const router = {
    'sample': handlers.sample,
};