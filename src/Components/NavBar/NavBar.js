// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
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
import PropTypes from "prop-types";

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
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">GUIDE</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Editor's Choice</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">PLACE LIST</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">COMMUNITY</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">FORUM</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">ABOUT US</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">SUPPORT</NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

NavBar.defaultProps = defaultProps;
NavBar.propTypes = propTypes;

export default NavBar;
