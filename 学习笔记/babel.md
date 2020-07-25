<!--
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 15:04:39
 * @LastEditTime: 2020-07-24 23:09:55
 * @FilePath: /学习笔记/babel.md
 * @Description: 
--> 
## 注
笔记主要来源: [慕课: 前端框架及项目面试 聚焦vue-react-webpack 视频教程](https://coding.imooc.com/class/chapter/419.html#Anchor)


babel 关心语法, 不关心模块化(webpack的工作), 不关心api,如箭头函数是一种语法, 而[10, 20].includes(20)中的includes是api

## 环境搭建 & 基本配置
.babelrc: 
```javascript
{
  // presets 就是把常用的plugins 打包
  "presets": [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  // babel 是通过一个一个plugin 来翻译不同的语法
  "plugins": [
  ]
}
```


## babel-polyfill
* polyfill - api补丁, 用于向下兼容
* core-js - 一个通用补丁库
* regenerator - 一个generator的补丁
* babel-polyfill 两者的集合
* babel 7.4 之后弃用babel-polyfill
* 推荐直接使用core-js 和 regenerator
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
    ...
  ]
}
```

## babel-runtime
* babel.polyfill 会污染全局环境, 祥见视频10-22
* 如果做一个独立的web系统, 则无碍
* 如果做一个第三方lib, 则会有问题
* runtime 会给api更改名字, 避免污染全局环境
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


