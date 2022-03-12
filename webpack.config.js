const path = require('path');

//Plugins
const HTMLPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ImageMin = require('imagemin-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DevServer = require('webpack-dev-server');

module.exports = {
  context: path.resolve(__dirname, 'source'),

  entry: './js/main.js',
  output: {
    filename: 'js/main.bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        //Styles
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true, url:false } },
        ],
      },

      //Images
      {
        test: /\.(?:|png|gif|jpg|jpeg|svg)$/i,
        use: [
          { loader: 'file-loader', options: {  name: '[name].[ext]' } },

        ],
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'source/fonts'), to: 'fonts' },
        { from: path.resolve(__dirname, 'source/img'), to: `img` },
      ],
    }),
    new HTMLPlugin({
      template: path.resolve(__dirname, 'source/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
