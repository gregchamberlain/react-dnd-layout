var getConfig = require('hjs-webpack');

var config = getConfig({
  isDev: process.env.NODE_ENV !== "production",
  in: process.env.NODE_ENV !== "production"?'example/main.js':'src/index.js',
  out: 'dist',
  output: {
    filename: 'bundle.js'
  },
  clearBeforeBuild: true,
});

if (process.env.NODE_ENV === "production"){
  // config.externals = [{
  //   react: {
  //     root: 'React',
  //     commonjs2: 'react',
  //     commonjs: 'react',
  //     amd: 'react'
  //   }
  // }];
  // config.output = {
  //   filename: 'bundle.js',
  //   libraryTarget: 'umd',
  //   library: 'ReactDnDLayout'
  // };
  config.output.libraryTarget = "commonjs2";
}
module.exports = config;
