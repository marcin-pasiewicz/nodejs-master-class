const assert = require('assert');
const helpers = require('./../lib/helpers');
const logs = require('./../lib/logs');
const exampleDebbugingProblem = require('./../lib/exampleDebbugingProblem');

const unit = {};

unit['helpers.getANumber should return a number'] = function (done) {
    const val = helpers.getANumber();
    assert.equal(typeof (val), 'number');
    done()
};

unit['helpers.getANumber should return number 1'] = function (done) {
    const val = helpers.getANumber();
    assert.equal(val, 1);
    done()
};

unit['helpers.getANumber should return number 2'] = function (done) {
    const val = helpers.getANumber();
    assert.equal(val, 2);
    done()
};

unit['logs.list should callback a false error and array of log names'] = function(done) {
    logs.list(true, function (err, logFileNames) {
        assert.equal(err, false);
        assert.ok(logFileNames instanceof Array);
        assert.ok(logFileNames.length > 1)
        done()
    })
};

unit['logs.truncate should not throw even log ID does not exist it should callback error'] = function(done) {
    assert.doesNotThrow(function () {
        logs.truncate('I do not exist', function (err) {
            assert.ok(err);
            done()
        })
    }, TypeError)
};

unit['exampleDebbugingProblem.init should not throw when called'] = function(done) {
    assert.doesNotThrow(function () {
        exampleDebbugingProblem.init();
        done();
    }, TypeError)
};

module.exports = unit;