import { fromJS } from 'immutable';
import * as constants from './constants'

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  recommendList: [],
  articlePage: 1,
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
    case constants.ADD_HOME_LIST:{
      let list = state.get('articleList').concat(action.list)
      const articlePage = state.get('articlePage')
      list = [...list, ...action.list]
      list = fromJS(list)
      return state.merge({
        articleList: list,
        articlePage: articlePage + 1
      })
    }
    default:
      return state;
  }
}