// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as AuthAction from "../../ActionCreators/AuthAction";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    isLogin: state.reducer.isLogin
  };
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  handleEditor = () => {
    this.props.history.push({
      pathname: "/editor_choice"
    });
  };

  handleSignUp = () => {
    this.props.history.push({
      pathname: "/signup"
    });
  };

  handleLogout = () => {
    this.props.dispatch(AuthAction.signOut());
  };

  handleHome = () => {
    this.props.history.push({
      pathname: "/"
    });
  };

  render() {
    const { isLogin, isActive } = this.props;
    return (
      <Navbar className="navBar" light expand="md" fixed="top">
        <NavbarBrand className="navBar__logo" onClick={this.handleHome}>
          HOOAH!U
        </NavbarBrand>
        <NavbarToggler onClick={this.props.toggle} />

        <Collapse isOpen={this.props.isOpen} navbar>
          {this.props.menuVisible === true ? null : (
            <Nav className={cx("ml-auto", "navBar__items")} navbar>
              <NavItem>
                <NavLink
                  onClick={this.handleHome}
                  className={cx("navBar__items__item", {
                    "navBar__items__item-active": isActive === "feed"
                  })}
                >
                  Feed
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={cx("navBar__items__item", {
                    "navBar__items__item-active": isActive === "editor"
                  })}
                >
                  <div onClick={this.handleEditor}>Editor's Choice</div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={cx("navBar__items__item", {
                    "navBar__items__item-active": isActive === "place"
                  })}
                  href="/"
                >
                  Place List
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={cx("navBar__items__item", {
                    "navBar__items__item-active": isActive === "about"
                  })}
                >
                  About
                </NavLink>
              </NavItem>
              {isLogin === true ? (
                <NavItem onClick={this.handleLogout}>
                  <NavLink
                    className={cx("navBar__items__item", {
                      "navBar__items__item-active": isActive === "auth"
                    })}
                  >
                    Sign Out
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem
                  onClick={this.handleSignUp}
                  className="navBar__items__item"
                >
                  <NavLink
                    className={cx("navBar__items__item", {
                      "navBar__items__item-active": isActive === "auth"
                    })}
                  >
                    Sign In
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          )}
        </Collapse>
      </Navbar>
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(NavBar));
