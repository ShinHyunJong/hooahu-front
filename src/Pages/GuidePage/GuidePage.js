// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar } from "../../Components";
import cx from "classnames";

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
      data: [],
      selectedKey: "usfk",
      tabs: [
        { key: "usfk", name: "USFK Personnel" },
        { key: "local", name: "Local Community" },
        { key: "busi", name: "Business Owner" },
        { key: "korea", name: "About Korea" },
        { key: "trans", name: "Public Transportation" },
        { key: "area", name: "Area & Maps" },
        { key: "emer", name: "Emergency" }
      ]
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const { tabs, selectedKey } = this.state;
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
                <p>
                  Learn how to use <b>Hooah!U</b> smarter!
                </p>
              </div>
              <hr />
              {tabs.map(data => {
                return (
                  <div
                    key={data.key}
                    className={cx(
                      "guidePage__notice__content__wrapper__itemContainer",
                      {
                        "guidePage__notice__content__wrapper__itemContainer-active":
                          selectedKey === data.key
                      }
                    )}
                    onClick={() => this.handleClick(data.key)}
                  >
                    <div className="guidePage__notice__content__wrapper__itemContainer__item">
                      <p>{data.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="guidePage__feed">
          <div className="guidePage__feed__content">
            <div className="guidePage__feed__content__header">
              {this.renderBody()}
            </div>
            <hr />
          </div>
        </div>
      </div>
    );
  }

  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  handleClick = param => {
    this.setState({ selectedKey: param });
  };

  renderBody = () => {
    switch (this.state.selectedKey) {
      case "usfk":
        return <h4>How to use Hooah!U smarter for USFK Personnel</h4>;
      case "local":
        return <h4>How to use Hooah!U smarter for Local Community</h4>;
      case "busi":
        return <h4>How to use Hooah!U smarter for Business Owner</h4>;
      case "korea":
        return <h4>How to use Hooah!U smarter for About Korea</h4>;
      case "trans":
        return <h4>How to use Hooah!U smarter for Public Transportation</h4>;
      case "area":
        return <h4>How to use Hooah!U smarter for Area & Maps</h4>;
      case "emer":
        return <h4>How to use Hooah!U smarter for Emergency</h4>;
      default:
        return null;
    }
  };
}

GuidePage.defaultProps = defaultProps;
GuidePage.propTypes = propTypes;

export default connect(mapStateToProps)(GuidePage);
