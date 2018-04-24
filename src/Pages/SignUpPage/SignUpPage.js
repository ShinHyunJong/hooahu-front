// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import * as AuthAction from "../../ActionCreators/AuthAction";
import * as UserAction from "../../ActionCreators/UserAction";
import { NavBar, RoundButton, RoundInput } from "../../Components";
import { Container, Row, Col, Button } from "reactstrap";
import TextField from "material-ui/TextField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";

const defaultProps = {};
const propTypes = {};
const styles = {
  block: {
    marginTop: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 10
  },
  radioButton: {
    marginBottom: 16
  },
  label: {
    width: 200,
    fontSize: 24,
    color: "#9b9b9b"
  },
  labelCivilian: {
    fontSize: 22,
    color: "#9b9b9b"
  }
};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult,
    email: "",
    password: ""
  };
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleSignIn = () => {
    const params = { email: this.state.email, password: this.state.password };
    this.props.dispatch(AuthAction.postSignIn(params)).then(async value => {
      if (value === "failed") {
        return null;
      } else {
        await this.props.dispatch(UserAction.getUser(value));
        await this.props.history.goBack();
      }
    });
  };

  render() {
    return (
      <div>
        <Container className="signUp">
          <NavBar isActive="auth" />
          <Row className="signUp__content">
            <br /> <br /> <br /> <br /> <br /> <br />
            <div className="signUp__content__title">
              <h1 className="signUp__content__title__header">
                Sign In to Hooah!U
              </h1>
            </div>
            <br />
            <br />
            <br />
            <div className="signUp__content__inputArea">
              <RoundInput onChange={this.handleEmail} placeholder="Email" />
            </div>
            <div className="signUp__content__inputArea">
              <RoundInput
                onChange={this.handlePassword}
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="signUp__content__title__buttonArea">
              <RoundButton
                text="Sign In"
                icon="xi-mail"
                className="signUp__content__title__buttonIn"
                textClassName="signUp__content__title__buttonIn__text"
                iconClassName="signUp__content__title__icon"
                onClick={this.handleSignIn}
              />
            </div>
            <div className="signUp__content__title__buttonArea">
              <Link to="/signup/choose">
                <RoundButton
                  text="Sign Up With Email"
                  icon="xi-mail"
                  className="signUp__content__title__button"
                  textClassName="signUp__content__title__text"
                  iconClassName="signUp__content__title__icon"
                />
              </Link>
            </div>
            <div className="signUp__content__title">
              <div className="signUp__content__title__buttonArea">
                <Link to="/signup/username">
                  <RoundButton
                    text="Sign up with Facebook"
                    icon="xi-facebook-official"
                    className="signUp__content__title__buttonF"
                    textClassName="signUp__content__title__textF"
                    iconClassName="signUp__content__title__iconF"
                  />
                </Link>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default connect(mapStateToProps)(SignUpPage);
