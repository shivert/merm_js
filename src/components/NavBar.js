import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import { NavLink } from "react-router-dom";
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const CustomMenu = ({pathname}) => {

  let openMenu = '';

  pathname = pathname || '/dashboard';

  if (pathname === '/merm-reports' || pathname === '/user-reports') {
   openMenu = 'analytics';
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={[openMenu]}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/dashboard">
        <NavLink to="/dashboard">
          <Icon type="appstore" />
          <span>Dashboard</span>
        </NavLink>
      </Menu.Item>

      <Menu.Item key="/recent">
        <NavLink to="/recent">
          <Icon type="clock-circle" />
          <span>Recent</span>
        </NavLink>
      </Menu.Item>

      <Menu.Item key="/shared">
        <NavLink to="/shared">
          <Icon type="user" />
          <span>Shared With Me</span>
        </NavLink>
      </Menu.Item>

      <Menu.Item key="/favourites">
        <NavLink to="/favourites">
          <Icon type="heart" />
          <span>Favourites</span>
        </NavLink>
      </Menu.Item>

      <SubMenu
        key="analytics" title={<span><Icon type="bar-chart" /><span>Analytics</span></span>}
      >
        <Menu.Item key="/merm-reports">
          <NavLink to="/merm-reports">
            <span>Merm Reports</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/user-reports">
          <NavLink to="/user-reports">
            <span>User Reports</span>
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="/settings">
        <NavLink to="/settings">
          <Icon type="setting" />
          <span>Settings</span>
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

CustomMenu.propTypes = {
  pathname: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname
});

export default connect(mapStateToProps)(CustomMenu);
