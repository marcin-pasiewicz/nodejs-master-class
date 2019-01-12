_app = {};

_app.tests = {};

_app.tests.unit = require('./unit');

_app.countTests = function() {

};

_app.produceTestsReport = function(limit, successes, errors) {
    console.log('');
    console.log('-----------------BEGIN TEST REPORT-----------------');
    console.log('');
    console.log('Total:', limit);
    console.log('Passed:', successes);
    console.log('Failed:', errors.length);
    console.log('');

    if(errors.length > 0) {
        console.log('-----------------BEGIN ERROR DETAILS-----------------');
        console.log('');

        errors.forEach(function (testError) {
            console.log('\x1b[31m%s\x1b[0m', testError.name );
            console.log(testError.error);
            console.log('');
        });

        console.log('-----------------END ERROR DETAILS-----------------');
    }
    console.log('');
    console.log('-----------------END TEST REPORT-----------------');
};

_app.countTests = function() {
    let counter = 0;

    for(let key in _app.tests) {
        if(_app.tests.hasOwnProperty(key)) {
            const subTest = _app.tests[key];

            for(let testName in subTest) {
                if(subTest.hasOwnProperty(testName)) {
                    counter++
                }
            }
        }
    }
    return counter
};

_app.runTest = function() {
    const errors = [];
    let successes = 0;
    let counter = 0;
    const limit = _app.countTests();

    for(let key in _app.tests) {
        if(_app.tests.hasOwnProperty(key)) {
            const subTest = _app.tests[key];

            for(let testName in subTest) {
                if(subTest.hasOwnProperty(testName)) {
                    (function () {
                        let tmpTestName = testName;
                        let testValue = subTest[testName];

                        try {
                            testValue(function () {
                                console.log('\x1b[32m%s\x1b[0m', tmpTestName );
                                counter++;
                                successes++;
                                if(counter === limit) {
                                    _app.produceTestsReport(limit, successes, errors)
                                }
                            })
                        } catch (e) {
                            errors.push({
                                'name': testName,
                                'error': e
                            });
                            console.log('\x1b[31m%s\x1b[0m', tmpTestName );
                            counter++;
                            if(counter === limit) {
                                _app.produceTestsReport(limit, successes, errors)
                            }
                        }
                    })()
                }
            }
        }
    }
};

_app.runTest();