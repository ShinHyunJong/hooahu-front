// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar, RoundButton, RoundInput } from "../../Components";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, Route } from "react-router-dom";
import TextField from "material-ui/TextField";
import * as UserAction from "../../ActionCreators/UserAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const defaultProps = {};
const propTypes = {};

const styles = {
  input: {
    fontSize: 30,
    border: "2px blue solid"
  },
  inputArea: {
    width: 300,
    fontSize: 30,
    border: "2px green solid"
  },
  underline: {
    border: "2px red solid"
  }
};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class SignUpEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isChecking: false,
      isValid: true,
      isExist: false,
      isLength: true,
      isSecure: true
    };
  }

  render() {
    const { isValid, isExist, isLength, isSecure } = this.state;
    return (
      <Container className="signUpEmail">
        <NavBar menuVisible={true} isActive="auth" />
        <Row className="signUpEmail__content">
          <div className="signUpEmail__content__title">
            <h1 className="signUpEmail__content__title__text">
              What is your email?
            </h1>
            <div className="signUpEmail__content__title__inputArea">
              <RoundInput
                type="email"
                placeholder="ex) abc@gmail.com"
                onChange={this.handleEmailInput}
              />
              {isExist ? <p>This account exists.</p> : null}
              {isValid ? null : <p>Invalid Input!</p>}
            </div>

            <div className="signUpEmail__content__title__passwordArea">
              <RoundInput
                type="password"
                placeholder="password"
                onChange={this.handlePasswordInput}
              />
              {isLength ? null : <p>Minimum Length is 8.</p>}
              {isSecure ? null : (
                <p>Password must be in English and numbers.</p>
              )}
            </div>
            <RoundButton
              className="signUpEmail__content__title__button"
              text="Next"
              onClick={this.handleNext}
              textClassName="signUpEmail__content__title__text"
            />
          </div>
        </Row>
      </Container>
    );
  }

  handleNext = () => {
    this.props.history.push({
      pathname: "/signup/username",
      state: {
        type: this.props.location.state.type,
        c_type: this.props.location.state.c_type,
        email: this.state.email,
        password: this.state.password
      }
    });
  };

  handleEmail = e => {
    console.log("*");
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleEmailInput = e => {
    this.setState({ email: e.target.value, isChecking: true });
    const { dispatch } = this.props;
    const params = { email: e.target.value };
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    this.setState({ isValid: re.test(e.target.value) });

    dispatch(UserAction.checkEmail(params)).then(value => {
      if (value.isExists) {
        this.setState({
          isChecking: false,
          isExist: true
        });
      } else {
        this.setState({
          isChecking: false,
          isExist: false
        });
      }
    });
  };

  handlePasswordInput = e => {
    const re = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z!@#$%^&*?~{}`\[\]=\-\/+_\()\\><|,\.$;:'"]{6,}$/;
    this.setState({ isSecure: re.test(e.target.value) });
  };
}

SignUpEmail.defaultProps = defaultProps;
SignUpEmail.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(SignUpEmail));
