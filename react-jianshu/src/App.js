import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './common/header'
import { Provider } from 'react-redux'
import { GlobalStyle } from './style.js'
import { IconFontGlobalStyle } from './statics/iconfont/iconfont'
import store from './store'
import Home from './pages/home'
import Detail from './pages/detail/loadable'
import Login from './pages/login'
import Write from './pages/write'


function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <IconFontGlobalStyle />
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Header />
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login}/>
            <Route path='/write' exact component={Write}/>
            <Route path='/detail/:id' exact component={Detail}/>
          </Fragment>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
}

export default App;
