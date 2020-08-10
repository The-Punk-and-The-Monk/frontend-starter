/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-09 17:34:28
 * @LastEditTime: 2020-07-25 21:22:31
 * @FilePath: /frontend-starter/react-jianshu/src/pages/detail/index.js
 * @Description: 
 */
import React, {
  PureComponent
} from 'react';
import {
  connect
} from 'react-redux';
import {
  withRouter
} from 'react-router-dom'
import {
  actionCreators
} from './store'
import {
  DetailWrapper,
  Header,
  Content
} from './style'

class Detail extends PureComponent {

  componentDidMount() {
    this.props.getDetail(this.props.match.params.id)
  }

  render() {
    const {
      title,
      content
    } = this.props

    return ( <
      DetailWrapper >
      <
      Header > {
        title
      } <
      /Header> <
      Content dangerouslySetInnerHTML = {
        {
          __html: content
        }
      } >
      <
      /Content> < /
      DetailWrapper >
    )
  }
}

const mapState = (state) => {
  console.log(state)
  return {
    title: state.getIn(['detail', 'title']),
    content: state.getIn(['detail', 'content'])
  }
}

const mapDispatch = (dispatch) => ({
  getDetail(id) {
    dispatch(actionCreators.getDetail(id))
  }
})

export default connect(mapState, mapDispatch)(withRouter(Detail));