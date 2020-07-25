/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 19:22:53
 * @LastEditTime: 2020-07-24 19:24:52
 * @FilePath: /webpack-react-scaffolding/src/store/reducer.jsx
 * @Description: combine all store
 */ 
// import { reducer as headerReducer } from '../common/header/store';
// import { reducer as homeReducer } from '../pages/home/store';


import { combineReducers } from 'redux-immutable';


export default combineReducers({
  // header: headerReducer,
  // home: homeReducer,
})

