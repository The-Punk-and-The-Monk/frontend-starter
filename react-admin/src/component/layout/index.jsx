import React from 'react';
import PropTypes from 'prop-types';
import './theme.css';
import './index.scss';

import NavSide from 'component/nav-side/index.jsx';
import NavTop from 'component/nav-top/index.jsx';

const Layout = ({ children }) => (
  <div id="wrapper">
    <NavTop />
    <NavSide />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
