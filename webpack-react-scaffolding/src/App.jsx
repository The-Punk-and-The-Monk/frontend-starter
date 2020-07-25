/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 19:18:11
 * @LastEditTime: 2020-07-25 08:59:29
 * @FilePath: /webpack-react-scaffolding/src/App.jsx
 * @Description: entry
 */ 
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  render(){
    return (
      <div>the punk and the monk</div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
