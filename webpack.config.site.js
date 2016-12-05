var getConfig = require('hjs-webpack');

var config = getConfig({
  isDev: process.env.NODE_ENV !== "production",
  in: 'docs/src/index.js',
  out: 'docs/dist',
  output: {
    filename: 'bundle.js'
  },
  clearBeforeBuild: true,
});

module.exports = config;
