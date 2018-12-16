const readLine =  require('readline');
const util = require('util');
const debug = util.debuglog('cli');
const events = require('events');

class _events extends events{}
const e = new _events();

const cli = {};

e.on('man', function () {
    cli.responders.help();
});

e.on('help', function () {
    cli.responders.help();
});

e.on('exit', function () {
    cli.responders.exit();
});

e.on('stats', function () {
    cli.responders.stats();
});

e.on('list users', function (str) {
    cli.responders.listUsers(str);
});

e.on('more user info', function (str) {
    cli.responders.moreUserInfo(str);
});

e.on('list checks', function (str) {
    cli.responders.ListChecks(str);
});

e.on('more check info', function (str) {
    cli.responders.moreCheckInfo(str);
});

e.on('list logs', function () {
    cli.responders.listLogs();
});

e.on('more log info', function (str) {
    cli.responders.moreLogInfo(str);
});

cli.responders = {};

cli.responders.help = function() {
    console.log('You asked for help')
};

cli.responders.exit = function() {
    process.exit(0);
};

cli.responders.stats = function() {
    console.log('You asked for stats')
};
cli.responders.listUsers = function(str) {
    console.log('You asked for listUsers', str)
};
cli.responders.moreUserInfo = function(str) {
    console.log('You asked for moreUserInfo', str)
};
cli.responders.ListChecks = function(str) {
    console.log('You asked for ListChecks', str)
};
cli.responders.moreCheckInfo = function(str) {
    console.log('You asked for moreCheckInfo', str)
};
cli.responders.listLogs = function() {
    console.log('You asked for listLogs')
};
cli.responders.moreLogInfo = function(str) {
    console.log('You asked for moreLogInfo', str)
};

cli.processInput = function(str) {
    str = typeof(str) === 'string' && str.trim().length > 0 ? str.trim() : false;

    if(str) {
        const uniqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info'
        ];

        let matchFound = false;
        let counter = 0;

        uniqueInputs.some(function (input) {
            if(str.toLocaleLowerCase().indexOf(input) > -1) {
                matchFound = true;
                e.emit(input, str);
                return true
            }
        });

        if(!matchFound) {
            console.log("Sorry, try again")
        }

    }
};

cli.init = function () {
    console.log('\x1b[34m%s\x1b[0m','The CLI is running');
    const _interface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ''
    });

    _interface.prompt();
    _interface.on('line', function (str) {
        cli.processInput(str);
        _interface.prompt();
    });

    _interface.on('close', function(){
        process.exit(0);
    });
};

module.exports = cli;