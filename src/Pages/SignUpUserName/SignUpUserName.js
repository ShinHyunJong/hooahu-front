// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar } from "../../Components";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, Route } from "react-router-dom";

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
            <h1>Please enter your name.</h1>
            <Link to="/signup/username">
              <Button className="signUpUserName__content__title__button">
                <span className="signUpUserName__content__title__button__text">
                  다음으로
                </span>
              </Button>
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
