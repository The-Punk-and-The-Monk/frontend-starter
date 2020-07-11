import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'

import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style'

class Home extends PureComponent {

  componentDidMount() {
    this.props.changeHomeData();
    this.bindEvents();
  }

  handleScrollTop = () => {
    window.scrollTo(0, 0);
  }

  bindEvents = () => {
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }

  componentWillUnmout() {
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
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
        {
          this.props.showScrollTop ? 
            <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> :
            null
        }
        
      </HomeWrapper>
    )
  }
}

const mapState = (state) => ({
  showScrollTop: state.get('home').get('showScrollTop')
})

const mapDispatch = (dispatch) => ({
  changeHomeData() {
    dispatch(actionCreators.getHomeData())
  },
  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 400) {
      dispatch(actionCreators.toggleShowTop(true))
    } else {
      dispatch(actionCreators.toggleShowTop(false))
    }
  }
})

export default connect(mapState, mapDispatch)(Home);