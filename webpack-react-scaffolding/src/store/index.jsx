/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 19:22:33
 * @LastEditTime: 2020-07-24 19:23:20
 * @FilePath: /webpack-react-scaffolding/src/store/index.jsx
 * @Description: app redux index
 */ 
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

export default store;