/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-07-25 09:15:07
 * @FilePath: /webpack-react-scaffolding/template/store/reducer.js
 * @Description: 
 */ 
import { fromJS } from 'immutable';
import * as constants from './constants'

const defaultState = fromJS({
  topicList: [],
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_HOME_DATA:{
      return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList)
      })
    }

    default:
      return state;
  }
}