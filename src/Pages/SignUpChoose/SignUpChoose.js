// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { NavBar } from "../../Components";
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
        <Container className="signUpChoose">
          <NavBar />
          <Row className="signUpChoose__content">
            <div className="signUpChoose__content__title">
              <h1 className="signUpChoose__content__title__text">
                Who are you?
              </h1>

              <RadioButtonGroup
                name="shipSpeed"
                defaultSelected="Military Personnel"
                style={styles.block}
              >
                <RadioButton
                  value="Military Personnel"
                  label="Military Personnel"
                  style={styles.radioButton}
                  labelStyle={styles.label}
                />
                <RadioButton
                  value="Civilian"
                  label="Civilian"
                  style={styles.radioButton}
                  labelStyle={styles.labelCivilian}
                />
              </RadioButtonGroup>

              <Link to="/signup/email">
                <Button className="signUpChoose__content__title__button">
                  <span className="signUpChoose__content__title__button__text">
                    Next
                  </span>
                </Button>
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
