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
  }

  render() {
    return (
      <Container className="signUpEmail">
        <NavBar />
        <Row className="signUpEmail__content">
          <div className="signUpEmail__content__title">
            <h1 className="signUpEmail__content__title__text">
              What is your email?
            </h1>
            <div className="signUpEmail__content__title__input">
              <RoundInput type="email" placeholder="ex) abc@gmail.com" />
            </div>
            <Link to="/signup/username">
              <RoundButton
                className="signUpEmail__content__title__button"
                text="Next"
                textClassName="signUpEmail__content__title__text"
              />
            </Link>
          </div>
        </Row>
      </Container>
    );
  }
}

SignUpEmail.defaultProps = defaultProps;
SignUpEmail.propTypes = propTypes;

export default SignUpEmail;
