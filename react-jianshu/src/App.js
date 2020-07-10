import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './common/header'
import { Provider } from 'react-redux'
import { GlobalStyle } from './style.js'
import { IconFontGlobalStyle } from './statics/iconfont/iconfont'
import store from './store'
import Home from './pages/home'
import Detail from './pages/detail'


function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <IconFontGlobalStyle />
      <Provider store={store}>
        <Header />
        <BrowserRouter>
          <Fragment>
            <Route path='/' exact component={Home} />
            <Route path='/detail' exact component={Detail}/>
          </Fragment>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default App;
