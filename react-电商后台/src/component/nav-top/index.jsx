import React from 'react';
import { Link } from 'react-router-dom';
import User from 'service/user-service.jsx';
import Util from 'util/mm.jsx';

const _mm = new Util();
const _user = new User();

class NavTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: _mm.getStorage('userInfo').username || '',
    };
  }

  onLogout() {
    _user.logout().then((res) => {
      _mm.removeStorage('userInfo');
      window.location.href = '/login';
    }, (errMsg) => {
      _mm.errorTips(errMsg);
    });
  }

  render() {
    return (
      <nav className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <b>Happy</b>
            Mall
          </Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href={this.state.username ? "javascript:" : '/login'}>
              <i className="fa fa-user fa-fw" />
              {
                this.state.username
                  ? (
                    <span>
                      欢迎:
                      {this.state.username}
                    </span>
                  )
                  : <span>请登录</span>
              }
              <i className="fa fa-caret-down" />
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li onClick={this.onLogout}>
                <i className="fa fa-sign-out fa-fw" />
                Logout
              </li>
            </ul>

          </li>

        </ul>
      </nav>
    );
  }
}

export default NavTop;
