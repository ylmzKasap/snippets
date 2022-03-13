const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    styles: './src/index.css'
  },
  devtool: 'inline-source-map', // Display errors directly.
  devServer: {
    static: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    clean: true, // Delete useless stuff in dist.
    publicPath: '/', //  Make sure that files are served correctly on http://localhost:3000
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
};