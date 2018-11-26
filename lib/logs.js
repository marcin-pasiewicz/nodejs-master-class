const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const lib = {};
lib.baseDir = path.join(__dirname, '/../.logs/');

lib.append = function(file, string, callback) {
   fs.open(lib.baseDir + file + '.log', 'a', function (err, fileDescriptor) {
       if(!err && fileDescriptor) {
            fs.appendFile(fileDescriptor, string+'\n', function () {
                if(!err) {
                    fs.close(fileDescriptor, function (err) {
                        if(!err) {
                            callback(false)
                        } else {
                            callback('Error closing file that being appended')
                        }
                    })
                } else {
                    callback('Error appending to file')
                }
            });
       } else {
           callback('Could not open file for appending')
       }
   })
};

module.exports = lib;