/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 18:36:42
 * @LastEditTime: 2020-07-25 11:58:30
 * @FilePath: /frontend-starter/webpack-react-scaffolding/build/webpack.common.js
 * @Description: 
 */ 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPaht } = require('./paths.jsx')

module.exports = {
  entry: {
    index: path.join(srcPath, 'App.jsx'),
    // other: path.join(srcPath, 'Other.jsx')
  },
  module: {
    rules:[]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      favicon: "./favicon.ico",
      chunks: ['index', 'vendor', 'common']
    }),
    // new HtmlWebpackPlugin({
    //   template: path.join(srcPath, 'other.html'),
    //   filename: 'other.html',
    //   chunks: ['other',  'common']
    // })
  ]
}