// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar, RoundButton, RoundInput } from "../../Components";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, Route } from "react-router-dom";
import TextField from "material-ui/TextField";

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

class SignUpEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
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
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
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
                onChange={this.handleEmail}
              />
            </div>

            <div className="signUpEmail__content__title__passwordArea">
              <RoundInput
                type="password"
                placeholder="password"
                onChange={this.handlePassword}
              />
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
}

SignUpEmail.defaultProps = defaultProps;
SignUpEmail.propTypes = propTypes;

export default SignUpEmail;
