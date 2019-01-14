const tls = require('tls');
const fs = require('fs');
const path = require('path');

const options = {
    'ca': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
};

const outboundMessage = 'ping';
const client = tls.connect(6000, options, function () {
    client.write(outboundMessage)
});

client.on('data', function (inboundMessage) {
    const messageString = inboundMessage.toString();
    console.log('I wrote ' + outboundMessage + ' and they said ' + messageString)
    client.end()
})
