const repl = require('repl');

repl.start({
    'prompt': '>',
    'eval': function (str) {
        console.log('We are at evaluation stage: ', str);

         if(str.indexOf('fizz') > -1) {
             console.log('buzz')
         }
    }
});