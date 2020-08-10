/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 19:18:11
 * @LastEditTime: 2020-07-25 11:59:18
 * @FilePath: /frontend-starter/webpack-react-scaffolding/src/App.jsx
 * @Description: entry
 */ 
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store'

class App extends React.Component {

  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <Router>
            <div>aaa</div>
          </Router>
        </Provider>
      </Fragment>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)