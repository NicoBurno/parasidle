const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (() => {
  const isProduction = (process.env.NODE_ENV === 'production');

  const outputPath = path.join(__dirname, './www');
  const publicPath = '/';

  return {
    entry: './src/packages/parasidle-frontend/index.ts',
    output: {
      filename: `assets/js/[name].[${isProduction ? 'chunk' : ''}hash].js`,
      path: outputPath,
      publicPath,
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /.ejs$/,
          use: 'ejs-loader'
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]_[sha256:hash:base64:5]',
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.(woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: `assets/fonts/[name].[contenthash].[ext]`,
              }
            }
          ],
        }
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `assets/css/[name].[${isProduction ? 'chunk' : ''}hash].css`,
      }),
      new HtmlWebPackPlugin({
        template: './src/packages/parasidle-frontend/index.html.ejs',
      }),
    ],
    devServer: {
      contentBase: outputPath,
      compress: isProduction,
      port: 3000,
    }
  };
})();
