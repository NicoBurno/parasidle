const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'www'),
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
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html.ejs',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'www'),
    compress: true,
    port: 3000,
  }
}
