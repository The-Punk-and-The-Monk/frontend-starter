import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'

import {
  HomeWrapper,
  HomeLeft,
  HomeRight
} from './style'

class Home extends Component {

  componentDidMount() {
    this.props.changeHomeData();
  }

  render() {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img 
            alt=''
            className='banner-img' 
            src='https://upload.jianshu.io/admin_banners/web_images/4989/7aee9b231d11e9ba92248e65e8f407343f87376e.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
          />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend></Recommend>
          <Writer></Writer>
        </HomeRight>
      </HomeWrapper>
    )
  }
}

const mapDispatch = (dispatch) => ({
  changeHomeData() {
    dispatch(actionCreators.getHomeData())
  }
})

export default connect(null, mapDispatch)(Home);