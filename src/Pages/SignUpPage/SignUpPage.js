// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { NavBar, RoundButton } from "../../Components";
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
    actionResult: state.reducer.actionResult
  };
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(DefaultActionCreator.action());
  }

  render() {
    return (
      <div>
        <Container className="signUp">
          <NavBar />
          <Row className="signUp__content">
            <div className="signUp__content__title">
              <Link to="/signup/username">
                <RoundButton
                  text="Sign up with Facebook"
                  icon="xi-facebook-official"
                  className="signUp__content__title__buttonF"
                  textClassName="signUp__content__title__textF"
                  iconClassName="signUp__content__title__iconF"
                />
              </Link>

              <Link to="/signup/choose">
                <RoundButton
                  text="Sign up with Email"
                  icon="xi-mail"
                  className="signUp__content__title__button"
                  textClassName="signUp__content__title__text"
                  iconClassName="signUp__content__title__icon"
                />
              </Link>
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
