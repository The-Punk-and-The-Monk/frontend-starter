import * as CONSTANTS from './constants'
import { fromJS } from 'immutable'
import axios from 'axios'

const changeList = (data) => ({
  type: CONSTANTS.CHANGE_LIST,
  data: fromJS(data),
  totalPage: Math.ceil(data.length / 10)
})

export const searchFocus = () => ({
  type: CONSTANTS.SEARCH_FOCUS
})

export const searchBlur = () => ({
  type: CONSTANTS.SEARCH_BLUR
})

export const mouseEnter = () => ({
  type: CONSTANTS.MOUSE_ENTER
})

export const mouseLeave = () => ({
  type: CONSTANTS.MOUSE_LEAVE
})

export const changePage = () => ({
  type: CONSTANTS.CHANGE_PAGE
})

export const getList = () => {
  return (dispatch) => {
    axios.get('/api/headerList.json').then((res) => {
      dispatch(changeList(res.data.data))
    }).catch()
  }
}