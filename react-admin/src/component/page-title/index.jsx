import React from 'react'
import { Link } from 'react-router-dom'

class PageTitle extends React.Component {

  componentDidMount(){
    document.title = this.props.title + ' - HAPPYMALL';
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header">{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default PageTitle