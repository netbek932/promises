/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, results) => {
    if (err) {
      callback(err);
    } else {
      // console.log('fs.readFile successfully completed :)\n', callback);
      var firstLine = results.split(/\r?\n/);
      callback(null, (err, firstLine[0]));
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request.get(url, function (err, response) {
    if (err) {
      callback(err);
    } else {
      callback(null, (err, response.statusCode));
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
