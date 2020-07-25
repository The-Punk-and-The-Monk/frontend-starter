<!--
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:30:37
 * @LastEditTime: 2020-07-25 09:46:02
 * @FilePath: /webpack-react-scaffolding/readme.md
 * @Description: 
--> 
# 自己配置的react开发环境
## react相关
```json
{
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-is": "^16.13.1",
    "react-loadable": "^5.5.0",
    "react-redux": "^7.2.0",
    "react-router-dom": "^5.2.0",
    "redux": "^4.0.5",
    "redux-thunk": "^2.3.0"
  }
}
```

## webpack相关
```json
{
  "devDependencies": {
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",
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
}
```

### 启用的功能
* 小图片base64
* 为bundle加hash
* 抽离与压缩css, scss
* babel-loader开启缓存
* 分割代码块, 分为"vendor":第三方模块, "common": 公共模块, 祥见./build/webpack.prod.js

### 未启用的功能(默认注释掉)
* 多入口
* happyPack 多进程打包
* ParalleUglifyPlugin 并行压缩输出的js代码

## babel 相关
.babelrc.json: 
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {  
        "useBuiltIns": "usage", 
        "corejs": 3
      }  
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3, 
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```


## 其他
```json
{
  "dependencies": {
    "axios": "^0.19.2",
    "immutable": "^4.0.0-rc.12",
    "styled-components": "^5.1.1"
  }
}
```