const path = require('path');
// const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'powermarker.user.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};