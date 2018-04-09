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

const defaultProps = {};
const propTypes = {};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    return (
      <Navbar className="navBar" light expand="md" fixed="top">
        <NavbarBrand href="/">Hooah!U</NavbarBrand>
        <NavbarToggler onClick={this.props.toggle} />

        <Collapse isOpen={this.props.isOpen} navbar>
          {this.props.menuVisible === true ? null : (
            <Nav className={cx("ml-auto", "navBar__items")} navbar>
              <NavItem>
                <NavLink href="/">FEED</NavLink>
              </NavItem>
              <Link to="/editor_choice">
                <NavItem>
                  <NavLink>EDITOR'S CHOICE</NavLink>
                </NavItem>
              </Link>
              <NavItem>
                <NavLink href="/">PLACE LIST</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">ABOUT US</NavLink>
              </NavItem>
              <Link to="/signup">
                <NavItem>
                  <NavLink href="/">SIGN IN</NavLink>
                </NavItem>
              </Link>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default NavBar;
