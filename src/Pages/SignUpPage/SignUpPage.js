// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { SignUpUserName, DefaultReduxPage } from "../../Pages";
import { NavBar } from "../../Components";
import { Container, Row, Col, Button } from "reactstrap";
import { AnimatedSwitch, spring } from "react-router-transition";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8)
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1)
  }
};

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22
  });
}

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
          <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"
          >
            <Route path="/signup/username" component={SignUpPage} />
          </AnimatedSwitch>
          <Row className="signUp__content">
            <div className="signUp__content__title">
              <h1>Please enter your email.</h1>
              <Link to="/signup/username">
                <Button className="signUp__content__title__button">
                  <span className="signUp__content__title__button__text">
                    다음으로
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
