import * as CONSTANTS from './constants'
import { fromJS } from 'immutable';

const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  list: [],
  page: 0,
  totalPage: 1
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case CONSTANTS.SEARCH_FOCUS:
      return state.set('focused', true)
    case CONSTANTS.SEARCH_BLUR:
      return state.set('focused', false)
    case CONSTANTS.CHANGE_LIST:
      return state.merge({
        list: action.data,
        totalPage: action.totalPage
      })
    case CONSTANTS.MOUSE_ENTER:
      return state.set('mouseIn', true)
    case CONSTANTS.MOUSE_LEAVE:
      return state.set('mouseIn', false)
    case CONSTANTS.CHANGE_PAGE: {
      const page = state.get('page')
      const totalPage = state.get('totalPage')
      const nextPage = (page + 1) % totalPage
      return state.set('page', nextPage)
    }
    default:
      return state;
  }
}