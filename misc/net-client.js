const net = require('net');
const outboundMessage = 'ping';
const client = net.createConnection({'port': 6000}, function () {
    client.write(outboundMessage)
});

client.on('data', function (inboundMessage) {
    const messageString = inboundMessage.toString();
    console.log('I wrote ' + outboundMessage + ' and they said ' + messageString)
    client.end()
})
