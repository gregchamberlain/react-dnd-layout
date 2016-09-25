var webpack = require('webpack');

module.exports = {
  entry: './src/index',
  module: {
    loaders: [
      { test: [/\.jsx?$/, /\.js?$/], loader: 'babel', exclude: /node_modules/ }
    ]
  },
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }],
  resolve: {
    extensions: ["", ".js", '.jsx']
  },
  output: {
    filename: 'dist/bundle.js',
    libraryTarget: 'commonjs2',
    library: 'ReactDnDLayout'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
