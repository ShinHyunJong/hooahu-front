// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

const defaultProps = {};
const propTypes = {};

class TabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tabBar = [
      "GUIDE",
      "EDITOR'S CHOICE",
      "PLACE LIST",
      "COMMUNITY",
      "FORUM",
      "ABOUT US",
      "SUPPORT"
    ];
    return (
      <nav className="tabBar">
        <ul className="tabBar__items">
          {tabBar.map((data, index) => {
            return (
              <li className="tabBar__items__item" key={index}>
                {data}
              </li>
            );
          })}
        </ul>
        <div className="tabBar__user">
          <div className="tabBar__user__signIn">SIGN IN</div>
          <span className="tabBar__user__icon">
            <i className="xi-user-o" />
          </span>
        </div>
      </nav>
    );
  }
}

TabBar.defaultProps = defaultProps;
TabBar.propTypes = propTypes;

export default TabBar;
