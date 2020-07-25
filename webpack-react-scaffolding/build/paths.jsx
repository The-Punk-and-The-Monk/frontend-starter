/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 18:37:21
 * @LastEditTime: 2020-07-24 19:16:09
 * @FilePath: /webpack-react-scaffolding/build/paths.jsx
 * @Description: 常用路径
 */ 

const path = require('path');

const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, 'dist')

module.exports = {
  srcPath,
  distPath
}