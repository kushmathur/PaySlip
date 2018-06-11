const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: {
    app:'./src/index.js'
  },
  devServer: {
     contentBase: './src'
   },
   devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src')
  },
  mode:'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude:'/node_modules/'
      }
     ]
   }
};

module.exports = config;