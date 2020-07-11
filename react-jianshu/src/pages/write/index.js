import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
// import { actionCreators } from './store'

class Write extends PureComponent {
  render() {
    const { loginStatus } = this.props;
    if(loginStatus) {
      return (
        <div>写文章</div>
      )
    }else{
      return (
        <div>请先登录</div>
      )
    }
    
  }
}

const mapState = (state) => ({
  loginStatus: state.getIn(['login', 'login'])
})

export default connect(mapState, null)(Write)