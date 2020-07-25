## 注

[学习 webpack 前，你需要了解的那些概念](https://juejin.im/post/597f508f5188255694568924)

笔记主要来源: [慕课: 前端框架及项目面试 聚焦vue-react-webpack 视频教程](https://coding.imooc.com/class/chapter/419.html#Anchor)


## 基本配置

1. 抽成三个模块
  + webpack.common.js
  + webpack.dev.js
  + webpack.prod.js
  + paths.js // 存放路径

  
  在dev和prod中用

  ~~~javascript
  const webpackCommonConf = require('./webpack.common.js')
  const { merge } = require('webpack-merge')
  
  module.exports = merge(webpackCommonConf, {

    ...

  })
  ~~~

  

``` javascript
  // paths.js
  const path = require('path')

  const srcPath = path.join(__dirname, '..', 'src')
  const distPath = path.join(__dirname, '..', 'dist')

  module.exports = {
      srcPath,
      distPath
  }
```

2. webpack.common.js

~~~javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath, distPath } = require('./paths')

module.exports = {

    entry: path.join(srcPath, 'index'),   // 指定入口
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // loader 的执行顺序是：从后往前
                loader: ['style-loader', 'css-loader', 'postcss-loader'] // 加了 postcss 处理兼容性
            },
            {
                test: /\.less$/,
                // 增加 'less-loader' ，注意顺序
                loader: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({   // 指定index.html 模板文件
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ]

}
~~~

3. webpack.dev.js

~~~javascript
const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {

    mode: 'development',
    module: {
        rules: [
            // 开发环境直接引入图片 url
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development'
            ENV: JSON.stringify('development')
        })
    ],
    devServer: {    //开发环境服务器配置
        port: 8080,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩

        // 设置代理, 处理接口跨域问题
        proxy: {  
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    }

})
~~~

4. webpack.prod.js

~~~javascript
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = merge(webpackCommonConf, {

    mode: 'production',
    output: {
        // prod打包代码时，加上 hash 戳, contentHash是根据最后的文件算出来的hash, 
        // 如果hash不变,浏览器可以利用缓存
        filename: 'bundle.[contentHash:8].js',  
        path: distPath,
    },
    module: {
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,

                        // 打包到 img 目录下
                        outputPath: '/img1/',
                    }
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        })
    ]

})
~~~

5. package.json: 
```json
{
  "scripts": {
    "dev": "node_modules/.bin/webpack-dev-server --config build/webpack.dev.js",
    "build": "node_modules/.bin/webpack --config build/webpack.prod.js"
  },
  "devDependencies": {
    "@babel/core": "^7.10.5",
    "@babel/plugin-transform-runtime": "^7.10.5",
    "@babel/preset-env": "^7.10.4",
    "@babel/preset-react": "^7.10.4",
    "@babel/runtime": "^7.10.5",
    "@babel/runtime-corejs3": "^7.10.5",
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",
    "core-js": "^3.6.5",
    "css-loader": "^3.6.0",
    "file-loader": "^6.0.0",
    "html-webpack-plugin": "^4.3.0",
    "mini-css-extract-plugin": "^0.9.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^3.0.0",
    "style-loader": "^1.2.1",
    "terser-webpack-plugin": "^3.0.7",
    "url-loader": "^4.1.0",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0",
    "webpack-merge": "^5.0.9"
  },
  "dependencies": {
    "axios": "^0.19.2",
    "immutable": "^4.0.0-rc.12",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-is": "^16.13.1",
    "react-loadable": "^5.5.0",
    "react-redux": "^7.2.0",
    "react-router-dom": "^5.2.0",
    "redux": "^4.0.5",
    "redux-thunk": "^2.3.0",
    "styled-components": "^5.1.1"
  }
}
```

## 抽离与压缩css

移动common中的css处理规则到dev中(即dev环境下, 不抽离css)
在生产环境需要抽离css, 避免js过于庞大

webpack.prod.js :
~~~javascript
// 用到的包
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const TerserJSPlugin = require('terser-webpack-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

{
  plugins: [

    // 独立css文件
    new MiniCssExtractPlugin({
      filename: 'css/main.[contentHash:8].css'
    })

  ], 
  optimization: {

    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

  }, 
  module: {

    rules: [
      // 抽离 css
      {
        test: /\.css$/,
        loader: [
            MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
            'css-loader',
            'postcss-loader'
        ]
      },
      // 抽离 less --> css
      {
        test: /\.less$/,
        loader: [
            MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
            'css-loader',
            'less-loader',
            'postcss-loader'
        ]
      }
    ],

  }, 
}
~~~

## 多入口(非单页面(SPA))

webpack.common.js: 
~~~javascript
{
  entry: {

    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js')

  }, 
  plugins: [

    // new HtmlWebpackPlugin({
    //     template: path.join(srcPath, 'index.html'),
    //     filename: 'index.html'
    // })

    // 多入口 - 生成 index.html
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'index.html'),
        filename: 'index.html',
        // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
        chunks: ['index']  // 这里的'index'对应entry.index, 只引用 index.js
    }),
    // 多入口 - 生成 other.html
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'other.html'),
        filename: 'other.html',
        chunks: ['other']  // 只引用 other.js
    })

  ]
}
~~~

webpack.prod.js:
~~~javascript
{
  output: {

    // filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
    filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
    path: distPath,

  }
}
~~~

## 抽离公共代码和第三方模块(代码)

如果没有将公共代码和第三方模块抽离, 这些代码会写入到同一个文件, 如index.[hash].js, 这样子, 如果我们只是改业务代码, 打包的文件就变成index.[newHash].js, 但是里面的公共代码和第三方模块都没有变, 却要被'重新加载', 所以需要抽离出来.

webpack.common.js: 
~~~javascript
{
  entry: {

    index: path.join(srcPath, 'index.js'),
    other: path.join(srcPath, 'other.js')

  }, 
  plugins: [

    // new HtmlWebpackPlugin({
    //     template: path.join(srcPath, 'index.html'),
    //     filename: 'index.html'
    // })

    // 多入口 - 生成 index.html
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'index.html'),
        filename: 'index.html',
        // chunks 表示该页面要引用哪些 chunk
        // 会产出chunk关键字的地方
        // entry 的每个key
        // optimization.splitChunks.cacheGroups.key.name  见下面webpack.prod.js的配置
        // 代码里面的异步加载module, 但是名字是自动生成的, 所以不知道名字
        chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
    }),
    // 多入口 - 生成 other.html
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'other.html'),
        filename: 'other.html',
        chunks: ['other', 'common']  // 考虑代码分割
    })

  ]
}
~~~

webpack.prod.js: 
~~~javascript
{
  optimization: {

      // 分割代码块
      splitChunks: {
          chunks: 'all',
          /**
           * initial 入口 chunk，对于异步导入的文件不处理
              async 异步 chunk，只对异步导入的文件处理
              all 全部 chunk
            */

          // 缓存分组
          cacheGroups: {
              // 第三方模块
              vendor: {
                  name: 'vendor', // chunk 名称
                  priority: 1, // 权限更高，优先抽离，重要！！！
                  test: /node_modules/,
                  minSize: 0,  // 大小限制, 过小的文件不如直接写入, 如果将其抽离, 反而浪费请求
                  minChunks: 1  // 最少复用过几次
              },

              // 公共的模块
              common: {
                  name: 'common', // chunk 名称
                  priority: 0, // 优先级
                  minSize: 0,  // 公共模块的大小限制
                  minChunks: 2  // 公共模块最少复用过几次
              }
          }
      }
    }

}
~~~

## 懒加载(异步加载js)

webpack默认支持, 不需要配置

index.js:
~~~javascript
setTimeout(() => {
  // 这里也会定义chunk, 但是名字是webpack自动生成的
  import('./something.js').then(res=>{

    ...

  })
})
~~~

## 处理jsx, react

package.json: 
~~~json
"devDependencies": {

    "babel-core": "6.26.0",
    "babel-loader": "7.1.2",
    "babel-preset-env": "1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "6.24.1",
    "babel-preset-stage-0": "^6.24.1",

  }, 
~~~

webpack.common.js: 
~~~javascript
module: {

    rules: [
      // react语法的处理, stage-0解决在class中使用箭头函数的问题
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: { // 这里的options可以单独写一个文件, 见babel官网
            presets: ['env', 'es2015', 'react', 'stage-0'],
          },
        },
      },
    ],

  }, 
~~~


## webpack 性能优化

两个方面:

一. 优化打包构建速度 - 开发体验和效率

1. 优化 babel-loader (可用于生成环境)

  ~~~javascript
  {
    test: /\.js$/,
    use:{
      loader: 'babel-loader?cacheDirectory',  // 开启缓存
      options: {
        presets: ['env', 'es2015', 'react', 'stage-0'],
      },
    }, 
    include: path.resolve(__dirname, 'src'), // 明确范围
    // 排除范围
    exclude: path.resolve(__dirname, 'node_modules')
  }
  ~~~
  

2. IgnorePlugin (可用于生产环境)


3. noParse  (可用于生成环境)
webpack noParse作用主要是过滤不需要解析的文件，比如打包的时候依赖了三方库（jquyer、lodash）等，而这些三方库里面没有其他依赖，可以通过配置noParse不去解析文件，提高打包效率

4. happyPack 多进程打包  (可用于生产环境)
* js单线程, 开启多进程打包
* 提高构建速度(特别是多核cpu)

webpack. 看需求.js: 
~~~javascript
// const HappyPack = require('happypack')

{
module: {

    rules: [
        // js
        {
            test: /\.js$/,
            // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
            use: ['happypack/loader?id=babel'],
            include: srcPath,
            // exclude: /node_modules/
        },
        
    ]
    },
    plugins: [
        // happyPack 开启多进程打包
        new HappyPack({
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'babel',
            // 如何处理 .js 文件，用法和 Loader 配置中一样
            loaders: ['babel-loader?cacheDirectory']
        }),
    ],

}
~~~

5. ParallelUglifyPlugin 多进程压缩js (可用于生产环境)
* 注: dev下没必要压缩js
* webpack 内置Uglify工具压缩js
* js单线程, 开启多进程压缩更快
* 与happyPack同理

webpack.prod.js: 
~~~javascript
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

{
  plugins: [
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
        // 传递给 UglifyJS 的参数
        // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
        uglifyJS: {
            output: {
                beautify: false, // 最紧凑的输出
                comments: false, // 删除所有的注释
            },
            compress: {
                // 删除所有的 `console` 语句，可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }
    })

  ], 
}
~~~

6. 自动刷新 (不用于生产环境)

用了webpack-dev-server, 保存时会自动打包跟刷新浏览器

7. 热更新 (不用于生产环境)
* 自动刷新: 整个网页全部刷新, 状态会丢失, 速度慢
* 热更新: 新代码生效, 网页不刷新, 状态不丢失, 如输入好的input的值会保留
* 代价: 需要在自己的代码中, 界定需要热更新的地方
* 按需使用, 当自动刷新清除状态成为一个麻烦时, 如需要重新填写表单等, 可以考虑用热更新

webpack.common.js: 
~~~javascript
// const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin'); 

{
  entry: {

      // index: path.join(srcPath, 'index.js'),
      index: [
          'webpack-dev-server/client?http://localhost:8080/',
          'webpack/hot/dev-server',
          path.join(srcPath, 'index.js')
      ],

  }, 
  plugins: [

    new HotModuleReplacementPlugin()

  ], 
  devServer: {

    hot: true,

  }
}
~~~

my.js: 
~~~javascript
import { sum } from './math'

const sumRes = sum(10, 20)
console.log('sumRes', sumRes)

// 增加，开启热更新之后的代码逻辑
if (module.hot) {

    module.hot.accept(
      ['./math'], // 监听math的更新
      () => { // math更改后的回调
        const sumRes = sum(10, 30)
        console.log('sumRes in hot', sumRes)
    })

}
~~~

8. DllPlugin动态链接库插件 (不用于生产环境)
* 原理与配置详见视频10-13
* 前端框架如vue React, 体积大, 构建慢
* 较稳定, 不常升级版本
* 同一个版本只构建一次即可, 不用每次都重新构建
* webpack 内置DllPlugin支持
* 通过DllPlugin 打包出dll文件
* 通过DllRefrencePlugin使用dll文件
* 按需使用

9. 关于开启多进程
* 项目较小, 打包很快, 开启多进程会降低速度(进程开销)
* 项目较大, 打包很慢, 开启多进程能提高速度
* 先写项目, 等打包变慢的时候, 再去开启多进程

二. 优化产出代码
目标: 

* 体积更小
* 合理分包, 不重复加载
* 速度更快, 内存使用更少

1. 小图片base64编码
2. bundle 加 hash
3. 懒加载
4. 提取公共代码,第三方模块
5. IngorePlugin 
6. 使用cdn加速(修改所有静态文件url的前缀, 即通过webpack.prod.js.output.publicPath, 将打包出来的dist目录放到用了cdn加速的服务器上)

7. 使用production, 即`` `mode: 'production'` ``
* webpack会自动开启代码压缩
* 前端框架等, 会自动删掉调试代码(如开发环境的warning)
* 会自动启动tree-shaking
  + tree-shaking, 即删去没有用到的代码
  + es6 module 才能让tree-shaking生效
  + commonjs 就不行
  + es6 module 静态引入, 编译时引入
  + commonjs 动态引入, 执行时引入
  + 只有es6 module 才能静态分析, 实现tree-shaking

  * 
  ~~~javascript

    // commonjs
    let someModule = require('some-module')
    if (something){
      // 可以动态引入, 执行时引入
      someModule = require('other-module')
    }

    // es6
    import someModule from 'some-module'
    if (something){
      // 编译时报错, 只能静态引入
      import someModule from 'other-module'
    }
    ~~~

8. 使用Scope Hosting
* 原理详情见视频10-18
* 代码体积更小
* 创建函数作用域更少
* 代码可读性更好

~~~javascript
const ModuleConcatenationPlugin = require('webpack/lib/ModuleConcatenationPlugin')

module.exports = {
  resolve: {
    // 针对 npm 中的第三方模块优先采用 jsnext:main 中指向的es6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    // 开启 scope hoisting
    new ModuleConcatenationPlugin(),
  ]
}
~~~


## 前端为何要进行打包和构建?
方面一: 代码方面
1. 体积更小(tree-shaking, 压缩, 合并), 加载更快
2. 编译高级语言或语法(ts, es6+, 模块化, scss)
3. 兼容性和错误检查(polyfill, postcss, eslint)

方面二: 研发环境方面
1. 统一, 高效的开发环境
2. 统一的构建流程和产出标准
3. 集成公司构建规范(提测, 上线等)
4. 


## module, bundle, chunk的区别

module - 各个源码文件, webpack中一切皆模块, js, css, 图片等, 能被引用的都是模块
chunk - 多个模块合并成的, 根据定义的chunk(可以定义chunk的地方: entry, splitChunk, import()), 分析它引用的模块, 把引用的模块和原来的模块合并成chunk
bundle - 最终的输出文件


## loader 和 plugin 的区别
1. loader 模块转换器, 如less -> css
2. plugin 扩展插件, 如HtmlWebpackPlugin
3. 常见loader和plugin


## babel 和 webpack 的区别
* babel - js新语法的编译工具, 不关心模块化
* webpack - 打包构建工具, 是多个loader, plugin的集合


## 如何产出一个lib
参考 上面的 DllPlugin动态链接库插件

## babel-ployfill 和 babel-runtime 的区别
* babel-polyfill 会污染全局
* babel-runtime 不会污染全局
* 产出第三方lib要用babel-runtime


## webpack 如何实现懒加载(异步加载)
* import()
* 结合vue, react异步组件
* 结合vue-router, react-router异步加载路由


## 为何proxy 不能被polyfill
* 如class可以用function模拟
* 如promise可以用callback来模拟
* 但proxy的功能用object.defineProperty无法模拟

