// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar, RoundButton, RoundInput } from "../../Components";
import { Container, Row, Col, Button } from "reactstrap";
import { SignUpUnit } from "../../Pages";

import { Link, Route } from "react-router-dom";
import { AnimatedRoute } from "react-router-transition";

const defaultProps = {};
const propTypes = {};

class SignUpUserName extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="signUpUserName">
        <NavBar />
        <Row className="signUpUserName__content">
          <div className="signUpUserName__content__title">
            <h1 className="signUpUserName__content__title__text">
              What is your name?
            </h1>
            <div className="signUpUserName__content__title__input">
              <RoundInput type="text" placeholder="First name" />
              <div className="signUpUserName__content__title__input__sub">
                <RoundInput type="text" placeholder="Last name" />
              </div>
              <div className="signUpUserName__content__title__input__sub">
                <RoundInput type="text" placeholder="Nick name" />
              </div>{" "}
            </div>
            <Link to="/signup/unit">
              <RoundButton
                className="signUpUserName__content__title__button"
                text="Next"
                textClassName="signUpUserName__content__title__text"
              />
            </Link>
          </div>
        </Row>
      </Container>
    );
  }
}

SignUpUserName.defaultProps = defaultProps;
SignUpUserName.propTypes = propTypes;

export default SignUpUserName;
