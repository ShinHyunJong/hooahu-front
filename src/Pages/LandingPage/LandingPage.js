// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import filterJson from "../../Json/filter";
import ec from "../../Json/ec";
import cx from "classnames";
import NumberFormat from "react-number-format";
import { NavBar, BoxList, Post, Thumb, SocialInput } from "../../Components";
import ProgressiveImage from "react-progressive-image-loading";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="landingPage">
        <NavBar isActive="feed" listClassName="landingPage__tabBar__list" />
        <div className="landingPage__welcome">
          <h2>로그인 안했을 때</h2>
        </div>
      </div>
    );
  }
}

LandingPage.defaultProps = defaultProps;
LandingPage.propTypes = propTypes;

export default connect(mapStateToProps)(LandingPage);
