// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar } from "../../Components";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult,
    user: state.reducer.user
  };
};

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const user = this.props;
    return (
      <div className="profilePage">
        <NavBar />
        <div>(여백)</div>
        <div>(여백)</div>
        <div>(여백)</div>
        <div>이메일 : {user && user.email}</div>
        <div>비밀번호 : </div>
        <div>이름 : </div>
        <div>닉네임 : </div>
        <div>타입 : </div>
        <div>c타입 : </div>
        <div>w타입 : </div>
        <div>Area : </div>
        <div>Camp : </div>
      </div>
    );
  }
}

ProfilePage.defaultProps = defaultProps;
ProfilePage.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePage);
