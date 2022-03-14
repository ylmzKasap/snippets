const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    clean: true, // Delete useless stuff in dist.
  },
  devtool: 'inline-source-map', // Display errors directly.
  devServer: {
    static: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    usedExports: true,
  },
};