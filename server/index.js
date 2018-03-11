// enable runtime transpilation to use ES6/7 in node
/* eslint-disable */

var fs = require('fs');

var babelrc = fs.readFileSync('package.json');
var config;

try {
  config = JSON.parse(babelrc).babel;
} catch (err) {
  console.log('--');
  console.error('ERROR: Error parsing your .babelrc.');
  console.error(err);
  console.log('--');
}

require('babel-register')(config);

require('./server');

/* eslint-enable */
