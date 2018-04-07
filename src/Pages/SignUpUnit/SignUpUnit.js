// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar } from "../../Components";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, Route } from "react-router-dom";

const defaultProps = {};
const propTypes = {};

class SignUpUnit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="signUpUnit">
        <NavBar />
        <Row className="signUpUnit__content">
          <div className="signUpUnit__content__title">
            <h1>Please enter your Unit.</h1>
            <Button className="signUpUnit__content__title__button">
              <span className="signUpUnit__content__title__button__text">
                다음으로
              </span>
            </Button>
          </div>
        </Row>
      </Container>
    );
  }
}

SignUpUnit.defaultProps = defaultProps;
SignUpUnit.propTypes = propTypes;

export default SignUpUnit;
