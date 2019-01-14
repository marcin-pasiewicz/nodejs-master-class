const net = require('net');
const server = net.createServer(function (connection) {
    const outboundMessage = 'pong';
    connection.write(outboundMessage)

    connection.on('data', function (inboundMessage) {
        const messageString = inboundMessage.toString();
        console.log('I wrote ' + outboundMessage + ' and they said ' + messageString)
    })
});

server.listen(6000)