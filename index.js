const http = require('http');
const url = require('url');
const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    const queryStringObject = parsedUrl.query;
    const method = req.method.toLocaleLowerCase();
    res.end('Hello world\n')
    console.log('Request received on path: ' + trimmedPath + ' with method: ' + method + ' with these query sting parameters ', queryStringObject)
});
server.listen(3000, function () {
    console.log('server is listening on port 3000 now')
});