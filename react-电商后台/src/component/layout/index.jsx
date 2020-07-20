import React from 'react'
import './theme.css'

import NavTop from '../nav-top/index.jsx'
import NavSide from 'component/nav-side/index.jsx'

class Layout extends React.Component {
  render(){
    return (
      <div id="wrapper">
        <NavTop></NavTop>
        <NavSide></NavSide>
        {this.props.children}
      </div>
    )
  }
}

export default Layout