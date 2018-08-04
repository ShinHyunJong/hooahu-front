// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import filterJson from "../../Json/filter";
import ec from "../../Json/ec";
import cx from "classnames";
import NumberFormat from "react-number-format";
import * as UserAction from "../../ActionCreators/UserAction";
import { NavBar, BoxList, Post, Thumb, SocialInput } from "../../Components";
import ProgressiveImage from "react-progressive-image-loading";
import { withRouter } from "react-router-dom"; // Material UI Provider for React

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isChecking: false,
      isValid: true,
      isLength: false
    };
  }

  render() {
    const { isChecking, isValid, isLength } = this.state;
    return (
      <div className="landingPage">
        <div className="landingPage__welcome">
          <div className="landingPage__welcome__info">
            <h1>
              Join and get connected <br />
              with people in <b>USFK Community</b>
            </h1>
            <h2>
              If you are new to Hooah!U,{" "}
              <span
                className="landingPage__welcome__info-signUp"
                onClick={this.handleSignUp}
              >
                Sign up
              </span>{" "}
              to join the network.
            </h2>
          </div>
          <div className="landingPage__welcome__input">
            <input
              className="landingPage__welcome__input__blank"
              placeholder="아이디"
              onChange={this.handleInput}
            />
            <input
              className="landingPage__welcome__input__blank"
              placeholder="비밀번호"
              onChange={this.handlePassword}
            />
            {isChecking ? <h1>체킹중</h1> : null}
            {!isValid ? (
              <h1>이미 가입된 이메일입니다.</h1>
            ) : (
              <h1>가능합니다!</h1>
            )}
            {isLength ? <h1>유효합니다.</h1> : <h1>유효하지 않음</h1>}
            <button>Login</button>
          </div>
        </div>
        <div className="landingPage__about" />
      </div>
    );
  }

  handleInput = e => {
    this.setState({ email: e.target.value, isChecking: true });
    const { dispatch } = this.props;
    const params = { email: e.target.value };
    dispatch(UserAction.checkEmail(params)).then(value => {
      if (value.isExists) {
        this.setState({ isChecking: false, isValid: false });
      } else {
        this.setState({ isChecking: false, isValid: true });
      }
    });
  };

  handlePassword = e => {
    if (e.target.value.length > 6) {
      this.setState({ isLength: true });
    } else {
      this.setState({ isLength: false });
    }
  };

  handleSignUp = () => {
    this.props.history.push({
      pathname: "/signup"
    });
  };
}

LandingPage.defaultProps = defaultProps;
LandingPage.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(LandingPage));