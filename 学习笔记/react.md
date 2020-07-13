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
react, 
redux, 管理 state, 方便组件之间传值
react-redux, 更方便的使用 redux
redux-thunk,  中间件, 异步 action, 
immutable, 不可变数据, 结合 PureComponent, 使 react 性能更高, 减少不必要的更新
redux-immutable, 用来结合多个 reducer
axios, 
styled-components,
react-transition-group, 动画
react-loadable, 根据需要加载页面,而不是一次性加载

## immutable 
1. https://immutable-js.github.io/immutable-js/
2. Immutable 详解及 React 中实践: https://github.com/camsong/blog/issues/3
3. 一些更新值的函数: mergeDeep, getIn, setIn, updateIn


## 杂
1. css reset, normalize.css 用来消除不同浏览器之中 css 默认样式的差异
2. html 的顺序对样式的呈现也有影响.