import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  Addition,
  Button,
} from './style';

class Header extends PureComponent {

  getListArea = () => {
    const { focused, list, page, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
    let newList = list.slice(page*10, (page + 1)*10)
    if(focused || mouseIn){
      return (
            <SearchInfo 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <SearchInfoTitle>
                热门搜索
                <SearchInfoSwitch onClick={handleChangePage}>换一批</SearchInfoSwitch>
              </SearchInfoTitle>
              <SearchInfoList>
                {
                  newList.map((item, index) => <SearchInfoItem key={item + index}>{item}</SearchInfoItem>)
                }
              </SearchInfoList>
            </SearchInfo>
      )
    }
    return null
  }

  render() {
    const { focused, list, handleInputFocus, handleInputBlur, login, logout } = this.props
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo />
        </Link>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          {
            login ? 
            <NavItem className='right' onClick={logout} style={{"cursor": "pointer"}}>退出</NavItem> :
              <Link to='/login'><NavItem className='right'  style={{"cursor": "pointer"}}>登录</NavItem></Link>
          }
          <NavItem className='right'>
            <span className="iconfont">&#xe636;</span>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={300}
              classNames='slide'
            >
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={() => handleInputFocus(list)}
                onBlur={handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <span 
              className={focused ? 'focused iconfont' : 'iconfont'}
            >&#xe614;</span>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to='/write'>
            <Button className='writting'>
              <span className="iconfont">&#xe708;</span>
              写文章
            </Button>
          </Link>
          <Button className='reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.get('header').get('focused'),
    mouseIn: state.get('header').get('mouseIn'),
    list: state.get('header').get('list'),
    page: state.get('header').get('page'),
    totalPage: state.get('header').get('totalPage'),
    login: state.getIn(['login', 'login'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      (list.size === 0) && dispatch(actionCreators.getList())
      dispatch(actionCreators.searchFocus())
    },

    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    },

    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter())
    },
    
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave())
    },

    handleChangePage() {
      dispatch(actionCreators.changePage())
    },
    logout() {
      dispatch(loginActionCreators.logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);