// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar } from "../../Components";
import { Container, Row, Col } from "reactstrap";
import filterJson from "../../Json/filter";
import ec from "../../Json/ec";
import Post from "../../Json/Post";
import cx from "classnames";
import NumberFormat from "react-number-format";
import ProgressiveImage from "react-progressive-image-loading";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {};
};

class GuidePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      data: []
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const postJson = Post.post;
    console.log(postJson);
    const objectArray = [
      { name: "서그림", age: "22" },
      { name: "윤지우", age: "24" },
      { name: "신현종", age: "26" }
    ];
    console.log(objectArray);
    console.log(objectArray.length);
    return (
      <div className="guidePage">
        <NavBar isActive="guide" />
        This is Guide Redux Page
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
              {objectArray
                .filter(a => {
                  return a.name !== "신현종";
                })
                .map((data, index) => {
                  return (
                    <div key={index}>
                      <p>{data.name}</p>
                      <span>{data.age}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="guidePage__feed">
          <div className="guidePage__feed__content">
            <div className="guidePage__feed__content__header">
              <h4
                style={this.state.input.length > 10 ? { color: "red" } : null}
              >
                How to use Hooah!U smarter for USFK Personnel
              </h4>
              <input placeholder="test" onChange={this.handleInput} />
              <div>{this.state.input}</div>
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

  handleInput = e => {
    this.setState({ input: e.target.value });
  };
}

GuidePage.defaultProps = defaultProps;
GuidePage.propTypes = propTypes;

export default connect(mapStateToProps)(GuidePage);
