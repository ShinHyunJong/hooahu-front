// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import filterJson from "../../Json/filter";
import ec from "../../Json/ec";
import cx from "classnames";
import NumberFormat from "react-number-format";
import * as AuthAction from "../../ActionCreators/AuthAction";
import * as UserAction from "../../ActionCreators/UserAction";
import {
  NavBar,
  BoxList,
  Post,
  Thumb,
  SocialInput,
  RoundInput
} from "../../Components";
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
      password: ""
    };
  }

  render() {
    const { onChangeEmail, onChangePassword, onClickSign } = this.props;
    return (
      <div className="landingPage">
        <NavBar isStart={true} />
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

          <div className="landingPage__welcome__signin">
            <div className="landingPage__welcome__signin__container">
              <div className="landingPage__welcome__signin__container__blank">
                <img src="" alt="" />
                <RoundInput
                  onChange={this.props.onChangeEmail}
                  placeholder="Email"
                  onKeyPress={this.handleEnter}
                />
              </div>

              <div className="landingPage__welcome__signin__container__blank">
                <img src="" alt="" />
                <RoundInput
                  onChange={this.props.onChangePassword}
                  placeholder="Password"
                  type="password"
                  onKeyPress={this.handleEnter}
                />
              </div>

              <div className="landingPage__welcome__signin__container__btn">
                <button onClick={this.props.onClickSign}>Log In</button>
              </div>
            </div>

            <div className="landingPage__welcome__signin__help">
              <p>What can I do with Hooah!U ?</p>
            </div>
          </div>
        </div>
        <div className="landingPage__about" />
      </div>
    );
  }

  handleSignUp = () => {
    this.props.history.push({
      pathname: "/signup"
    });
  };

  handleEnter = e => {
    if (e.key === "Enter") {
      this.props.onClickSign();
    }
  };
}

LandingPage.defaultProps = defaultProps;
LandingPage.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(LandingPage));
