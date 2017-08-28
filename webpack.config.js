let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
let port = 7777;
module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    port,
  },
  entry: './demo/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html'
    }),
    new OpenBrowserWebpackPlugin({
      url: 'http://localhost:' + port,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpg|png|gif|svg|swof)$/,
        use: 'url-loader?limit=8192',
      }
    ]
  }
};
/* 
 * console.log('What needs to change in this module?'); 
 * console.log('What would be incoming?');
 * console.log('What would be affected?');
 * console.log('What would be return?');
 */