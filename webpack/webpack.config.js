const path = require('path');
// const TerserPlugin = require("terser-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')


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
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
};