const path = require('path');

//Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMin = require('imagemin-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'source'),
  entry: {
    app: [
      './js/main.js',
    ],
  },

  devtool: 'source-map',

  output: {
    filename: 'js/main.bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        //Styles
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true, url: false } },
        ],
      },
      //Images
      {
        test: /\.(png|gif|jpe?g)$/i,
        use: [
          { loader: 'file-loader', options: { limit: 8292 } },
        ]
      },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   loader: 'file-loader'
      // }
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    })
  ],
};
