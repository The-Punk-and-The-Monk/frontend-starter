import * as constants from './constants'
import axios from 'axios'

export const getDetail = (id) => {
  return (dispatch) => {
    axios.get('/api/detail.json?id=' + id).then((res) => {
      const result = res.data.data
      console.log('456')
      dispatch({
        type: constants.CHANGE_DETAIL,
        result: result
      })
    }).catch()
  }
}