/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 18:36:52
 * @LastEditTime: 2020-07-24 22:58:42
 * @FilePath: /webpack-react-scaffolding/build/webpack.dev.js
 * @Description: 
 */ 

const webpack = require('webpack');
const webpackCommonConf = require('./webpack.common.js');
const {
  merge
} = require('webpack-merge');
const {
  srcPath,
  distPath
} = require('./paths.jsx');

// 热更新
// const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');


module.exports = merge(webpackCommonConf, {
  mode: 'development',

  // 热更新
  // entry: {
  //   // index: path.join(srcPath, 'index.js'),
  //   index: [
  //     'webpack-dev-server/client?http://localhost:8080/',
  //     'webpack/hot/dev-server',
  //     path.join(srcPath, 'index.js')
  //   ],
  //   other: path.join(srcPath, 'other.js')
  // },

  module: {
    rules: [
      // js,jsx文件处理
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader?cacheDirectory'],
        include: srcPath,
      },
      // 直接引入图片url
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: 'file-loader'
      },
      // css
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader']
      },
      // scss
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // window.ENV = 'development'
      ENV: JSON.stringify('development')
    }),

    // 热更新
    // new HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8787,
    progress: true,
    contentBase: distPath,
    open: true,
    compress: true,
    // hot: true, 热更新
    
    // 设置代理
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // }
  }
})