/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var ps = require('./promisification.js');
var promiseConstructor = require('./promiseConstructor.js');
var writeFileAsync = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
      if (!username) {
        throw new Error('User does not exist!');
      } else {
        return username;
      }
    })
    .then(function(githubUsername) {
      return ps.getGitHubProfileAsync(githubUsername);
    })
    .then(function(response) {
      return writeFileAsync(writeFilePath, JSON.stringify(response));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
