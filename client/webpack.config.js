const config = require('./config');
const path = require('path');
const local = p => path.join(__dirname, p);

module.exports = {
  output: {
    path: local('../server/public'),
    filename: 'bundle.js',
  },
  entry: local('src/entry.js'),
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' }
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }],
      },
    ],
  },
};
