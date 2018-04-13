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

  render() {
    const { isLogin } = this.props;
    return (
      <Navbar className="navBar" light expand="md" fixed="top">
        <NavbarBrand href="/">Hooah!U</NavbarBrand>
        <NavbarToggler onClick={this.props.toggle} />

        <Collapse isOpen={this.props.isOpen} navbar>
          {this.props.menuVisible === true ? null : (
            <Nav className={cx("ml-auto", "navBar__items")} navbar>
              <NavItem className="navBar__items__item">
                <NavLink href="/">FEED</NavLink>
              </NavItem>
              <NavItem className="navBar__items__item">
                <NavLink>
                  <div onClick={this.handleEditor}>EDITOR'S CHOICE</div>
                </NavLink>
              </NavItem>
              <NavItem className="navBar__items__item">
                <NavLink href="/">PLACE LIST</NavLink>
              </NavItem>
              <NavItem className="navBar__items__item">
                <NavLink href="/">ABOUT US</NavLink>
              </NavItem>
              {isLogin === true ? (
                <NavItem
                  onClick={this.handleLogout}
                  className="navBar__items__item"
                >
                  <NavLink>LOG OUT</NavLink>
                </NavItem>
              ) : (
                <NavItem
                  onClick={this.handleSignUp}
                  className="navBar__items__item"
                >
                  <NavLink>SIGN IN</NavLink>
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
