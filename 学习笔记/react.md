## react 性能优化的几个点
1. 在 constructor 中绑定函数
2. setState 是异步函数,把多次的更新合并为一次
3. 虚拟dom, 同层比对, key 值
4. shouldComponentUpdate 也可以用来阻止不必要的render

## redux
1. store 必须是唯一的
2. 只有 store 能改变自己的内容
3. reducer 必须是个纯函数(给定固定的输入, 就会有固定的输出, 而且不会有任何的副作用)
4. createStore, store.dispatch, store.getState, store.subscribe

## UI组件, 容器组件, 无状态组件
1. 无状态组件没有生命周期, 性能更高

## reset.css
1. 统一不同浏览器的元素渲染的 css 样式的默认值

## 用到的包
react, redux, react-redux, redux-thunk, immutable, redux-immutable, axios, styled-components,react-transition-group