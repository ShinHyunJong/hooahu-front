// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar } from "../../Components";
import { Container, Row, Col } from "reactstrap";
import filterJson from "../../Json/filter";
import ec from "../../Json/ec";
import cx from "classnames";
import NumberFormat from "react-number-format";
import ProgressiveImage from "react-progressive-image-loading";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class GuidePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="guidePage">
        <NavBar />This is Guide Redux Page
        <div className="guidePage__notice">
          <div className="guidePage__notice__content">
            <div className="guidePage__notice__content__wrapper">
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "left"
                }}
              >
                <p>Welcome!</p>
                <p>Learn how to use Hooah!U smarter!</p>
              </div>
              <hr />
              <div className="guidePage__notice__content__wrapper__itemContainer">
                <div className="guidePage__notice__content__wrapper__itemContainer__item">
                  <p>USFK Personnel</p>
                </div>
              </div>
              <div className="guidePage__notice__content__wrapper__itemContainer">
                <div className="guidePage__notice__content__wrapper__itemContainer__item">
                  <p>Local Community</p>
                </div>
              </div>
              <div className="guidePage__notice__content__wrapper__itemContainer">
                <div className="guidePage__notice__content__wrapper__itemContainer__item">
                  <p>Business</p>
                </div>
              </div>
              <div className="guidePage__notice__content__wrapper__itemContainer">
                <div className="guidePage__notice__content__wrapper__itemContainer__item">
                  <p>About Korea</p>
                </div>
              </div>
              <div className="guidePage__notice__content__wrapper__itemContainer">
                <div className="guidePage__notice__content__wrapper__itemContainer__item">
                  <p>Public Transportation</p>
                </div>
              </div>
              <div className="guidePage__notice__content__wrapper__itemContainer">
                <div className="guidePage__notice__content__wrapper__itemContainer__item">
                  <p>Area & Maps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="guidePage__feed">
          <div className="guidePage__feed__content">
            <div className="guidePage__feed__content__header">
              <h4>How to use Hooah!U smarter for USFK Personnel</h4>
            </div>
            <hr />
          </div>
        </div>
        <div className="guidePage__filter">
          <div className="guidePage__filter__wrapper">
            <div className="guidePage__filter__content">
              <h2>haha</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GuidePage.defaultProps = defaultProps;
GuidePage.propTypes = propTypes;

export default connect(mapStateToProps)(GuidePage);
