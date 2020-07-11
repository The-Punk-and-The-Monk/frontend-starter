import axios from 'axios'
import * as constants from './constants'

export const getHomeData = () => {
  return (dispatch) => {
    axios.get('/api/home.json').then((res) => {
      const result = res.data.data
      dispatch({
        type: constants.CHANGE_HOME_DATA,
        topicList: result.topicList,
        articleList: result.articleList,
        recommendList: result.recommendList
      })
    }).catch()
  }
}

export const getMoreList = (articlePage) => {
  return (dispatch) => {
    axios.get('/api/homeList.json?page=articlePage').then((res) => {
      const result = res.data.data
      dispatch({
        type: constants.ADD_HOME_LIST,
        list: result,
      })
    }).catch()
  }
}

export const toggleShowTop = (bool) => ({
  type: constants.TOGGLE_SHOW_TOP,
  showTop: bool
})
