/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 18:37:15
 * @LastEditTime: 2020-07-24 23:25:55
 * @FilePath: /webpack-react-scaffolding/build/webpack.prod.js
 * @Description: prod
 */

const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// const HappyPack = require('happypack')
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const {
  merge
} = require('webpack-merge')
const {
  srcPath,
  distPath
} = require('./paths.jsx')

module.exports = merge(webpackCommonConf, {
  mode: 'production',
  output: {

    filename: '[name].[contentHash:8].js', // name 即多入口是entry的key, 加上8字符哈希戳
    path: distPath,
    // publicPath: "http://cdn.abc.com", // 修改所有静态文件 url 的前缀
  },
  module: {
    rules: [
      // 多进程打包
      // // js
      // {
      //   test: /\.(js|jsx)$/,
      //   // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
      //   use: ['happypack/loader?id=babel'],
      //   include: srcPath,
      //   // exclude: /node_modules/
      // },
      // js,jsx文件处理
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader?cacheDirectory'],
        include: srcPath,
      },

      // 图片 - 小图片用base64
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于 5kb 的图片用 base64 格式产出
            // 否则，依然延用 file-loader 的形式，产出 url 格式
            limit: 5 * 1024,

            // 打包到img目录下
            outputPath: '/img/',

            // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
            // publicPath: 'http://cdn.abc.com'
          }
        }
      },

      // 抽离css
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader, // 不再用style-loader
          'css-loader',
          'postcss-loader'
        ]
      },
      // 抽离scss
      {
        test: /\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify('production')
    }),

    // 抽离 css
    new MiniCssExtractPlugin({
      filename: 'css/main.[contentHash:8].css'
    }),

    // 使用IgnorePlugin忽略某个目录, 如 忽略 moment 下的 /locale 目录
    // new webpack.IgnorePlugin(/\.\/locale/, /moment/),

    // // happyPack 开启多进程打包
    // new HappyPack({
    //   // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
    //   id: 'babel',
    //   // 如何处理 .js 文件，用法和 Loader 配置中一样
    //   loaders: ['babel-loader?cacheDirectory']
    // }),
    // // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    // new ParallelUglifyPlugin({
    //   // 传递给 UglifyJS 的参数
    //   // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
    //   uglifyJS: {
    //     output: {
    //       beautify: false, // 最紧凑的输出
    //       comments: false, // 删除所有的注释
    //     },
    //     compress: {
    //       // 删除所有的 `console` 语句，可以兼容ie浏览器
    //       drop_console: true,
    //       // 内嵌定义了但是只用到一次的变量
    //       collapse_vars: true,
    //       // 提取出出现多次但是没有定义成变量去引用的静态值
    //       reduce_vars: true,
    //     }
    //   }
    // })
  ],

  optimization: {
    // 压缩css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

    // 分割代码块
    splitChunks: {
      /**
       * initial 入口chunk，对于异步导入的文件不处理
        async 异步chunk，只对异步导入的文件处理
        all 全部chunk
      */
      chunks: 'all',

      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name: 'vendor', // chunk 名称
          priority: 1, // 权限最高, 优先抽离, 重要
          test: /node_modules/,
          minSize: 3 * 1024, // 太小的就算了
          minChunks: 1 // 最少复用过几次
        },

        // 公共模块
        common: {
          name: 'common',
          priority: 0,
          minSize: 3 * 1024,
          minChunks: 2, // 公共模块最少复用过几次
        }
      }
    }
  }
})