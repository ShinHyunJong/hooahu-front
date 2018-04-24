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
import { Thumb } from "../";
import { confirmAlert } from "react-confirm-alert"; // Import

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    isLogin: state.reducer.isLogin,
    user: state.reducer.user
  };
};

const options = {
  title: "Title",
  message: "Message",
  buttons: [
    {
      label: "Yes",
      onClick: () => alert("Click Yes")
    },
    {
      label: "No",
      onClick: () => alert("Click No")
    }
  ],
  childrenElement: () => <div />,
  customUI: ({ title, message, onClose }) => <div>Custom UI</div>,
  willUnmount: () => {}
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

  handleHome = () => {
    this.props.history.push({
      pathname: "/"
    });
  };

  handleUser = () => {
    this.props.history.push({
      pathname: "/@" + this.props.user.id
    });
  };

  handleAuth = () => {
    confirmAlert({
      title: "Confirm to sign out",
      message: "Are you sure to sign out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.dispatch(AuthAction.signOut()).then(value => {
              this.props.history.replace({ pathname: "/" });
            });
          }
        },
        {
          label: "No",
          onClick: () => null
        }
      ]
    });
  };

  render() {
    const { isLogin, isActive, user } = this.props;
    return (
      <Navbar className="navBar" light expand="md" fixed="top">
        <NavbarBrand className="navBar__logo" onClick={this.handleHome}>
          HOOAH!U
        </NavbarBrand>
        <NavbarToggler onClick={this.props.toggle} />

        <Collapse isOpen={this.props.isOpen} navbar>
          {this.props.menuVisible === true ? null : (
            <Nav className={cx("ml-auto", "navBar__items")} navbar>
              <NavItem
                className="navBar__items__item"
                onClick={this.handleUser}
              >
                <Thumb size={30} fontSize={20} src={user && user.profile_img} />
              </NavItem>
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
                <NavItem>
                  <NavLink
                    onClick={this.handleAuth}
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
