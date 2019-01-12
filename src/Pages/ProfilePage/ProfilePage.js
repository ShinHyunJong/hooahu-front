// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar } from "../../Components";

import * as AuthAction from "../../ActionCreators/AuthAction";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult,
    user: state.reducer.user,
    token: state.reducer.token
  };
};

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: ""
    };
  }

  render() {
    // console.log(this.props.user);
    const { user } = this.props;
    return (
      <div className="profilePage">
        <NavBar />
        <div className="profilePage__editForm">
          <label>
            Nickname{" "}
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              defaultValue={user && user.nickname}
              onChange={e => this.setState({ nickname: e.target.value })}
            />
          </label>
          <button value="Submit" onClick={this.onClickChangeUsername}>
            닉네임변경
          </button>
        </div>
      </div>
    );
  }

  onClickChangeUsername = () => {
    const params = {
      props: this.props,
      body: {
        nickname: this.state.nickname
      }
    };
    this.props.dispatch(AuthAction.postChangeUsername(params));
  };
}

ProfilePage.defaultProps = defaultProps;
ProfilePage.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePage);
