import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store'


import {
  
} from './style'

class Home extends PureComponent {

  componentDidMount() {

  }

  render() {
    return (
      <div></div>
    )
  }
}

const mapState = (state) => ({
  // showScrollTop: state.get('home').get('showScrollTop')
})

const mapDispatch = (dispatch) => ({
  // changeHomeData() {
  //   dispatch(actionCreators.getHomeData())
  // },
})

export default connect(mapState, mapDispatch)(Home);