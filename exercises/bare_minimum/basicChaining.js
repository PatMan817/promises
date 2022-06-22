/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var promisification = require('./promisification.js');
var fs = require('fs');
var Promise = require('bluebird');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, (err, fileData) => {
      if (err) {
        reject(err);
      } else {
        resolve(fileData);
      }
    });
  })
    .then(data => data.slice(0, data.indexOf('\n')))
    .then(username => promisification.getGitHubProfileAsync(username))
    .then(response => {
      return new Promise((resolve, reject) => {
        fs.writeFile(writeFilePath, JSON.stringify(response), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.stringify(response));
          }
        });
      });
    })
    .catch(err => console.error(err));
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
