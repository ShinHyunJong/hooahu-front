// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { NavBar, BoxList } from "../../Components";
import ec from "../../Json/ec";
import { Button } from "reactstrap";
import nprogress from "nprogress";
import filterJson from "../../Json/filter";
import cx from "classnames";
import ProgressiveImage from "react-progressive-image-loading";

// import list from "../../Json/HotTopic.json";
const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandNotice: false,
      selectedFeed: 0,
      selectedPost: 0
    };
  }

  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    nprogress.done();
  }

  handleFeed = index => {
    this.setState({ selectedFeed: index });
  };

  handlePost = index => {
    this.setState({ selectedPost: index });
  };

  handleEditor = id => {
    this.props.history.push({
      pathname: "/editor_choice/" + id
    });
  };

  handleExpand = () => {
    this.state.expandNotice === false
      ? this.setState({ expandNotice: true })
      : this.setState({ expandNotice: false });
  };

  render() {
    const feedType = filterJson.feed_type;
    const postType = filterJson.post_type;
    const randomPackage = Math.floor(Math.random() * 26);
    const selectedEC = ec.editorChoice[randomPackage];
    const { selectedFeed, selectedPost, expandNotice } = this.state;
    return (
      <div className="homePage">
        <NavBar isActive="feed" listClassName="homePage__tabBar__list" />
        <div className="homePage__notice">
          <div className="homePage__notice__content">
            <div className="homePage__notice__content__wrapper">
              <p>Welcome! ChungBok Lee</p>
              <p>
                You have
                <span className="homePage__notice__content__wrapper__notice">
                  7
                </span>
                new Notifications!
              </p>
              <hr />
              <div className="homePage__notice__content__wrapper__list">
                <div className="homePage__notice__content__wrapper__list__bar" />
                <div className="homePage__notice__content__wrapper__list__content">
                  <p>
                    <span className="homePage__notice__content__wrapper__notice-name">
                      Hyun Jong Shin
                    </span>and 3 more people liked your post
                  </p>
                </div>
              </div>
              <div className="homePage__notice__content__wrapper__list">
                <div className="homePage__notice__content__wrapper__list__bar" />
                <div className="homePage__notice__content__wrapper__list__content">
                  <p>
                    <span className="homePage__notice__content__wrapper__notice-name">
                      Hyun Jong Shin
                    </span>and 3 more people liked your post
                  </p>
                </div>
              </div>
              <div className="homePage__notice__content__wrapper__list">
                <div className="homePage__notice__content__wrapper__list__bar" />
                <div className="homePage__notice__content__wrapper__list__content">
                  <p>
                    <span className="homePage__notice__content__wrapper__notice-name">
                      Hyun Jong Shin
                    </span>and 3 more people commented on your post
                  </p>
                </div>
              </div>
              <hr className="homePage__noMargin" />
              <div className="homePage__notice__content__wrapper__more">
                <span
                  className={cx(
                    "homePage__notice__content__wrapper__more__text",
                    {
                      "homePage__notice__content__wrapper__more__text-expand":
                        expandNotice === true
                    }
                  )}
                  onClick={this.handleExpand}
                >
                  <i className="xi-arrow-down" /> 더보기
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="homePage__feed">
          <div className="homePage__feed__content">
            <div className="homePage__feed__content__inputArea">
              <div className="homePage__feed__content__inputArea__body">
                <div className="homePage__feed__content__inputArea__body__thumbArea">
                  <span className="homePage__feed__content__inputArea__body__thumbArea__thumb">
                    <i className="xi-user-o" />
                  </span>
                </div>
                <input className="homePage__feed__content__inputArea__body__input" />
              </div>
            </div>
          </div>
        </div>
        <div className="homePage__filter">
          <div className="homePage__filter__wrapper">
            <div className="homePage__filter__content">
              <div className="homePage__filter__content__label">
                <p className="homePage__filter__content__label__text">
                  Feed Types
                </p>
              </div>
              <div className="homePage__filter__content__items">
                {feedType.map((data, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => this.handleFeed(index)}
                      className={cx("homePage__filter__content__items__item", {
                        "homePage__filter__content__items__item-clicked":
                          selectedFeed === index
                      })}
                    >
                      {data}
                    </div>
                  );
                })}
              </div>
              <div className="homePage__filter__content__label">
                <p className="homePage__filter__content__label__text">
                  Post Types
                </p>
              </div>
              <div className="homePage__filter__content__items">
                {postType.map((data, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => this.handlePost(index)}
                      className={cx("homePage__filter__content__items__item", {
                        "homePage__filter__content__items__item-clicked":
                          selectedPost === index
                      })}
                    >
                      {data}
                    </div>
                  );
                })}
              </div>
              <hr />
              <div className="homePage__filter__content__editor">
                <p className="homePage__filter__content__editor__label">
                  See what experience you can have
                </p>
                <ProgressiveImage
                  preview={selectedEC.image_url[0]}
                  src={selectedEC.image_url[0]}
                  render={(src, style) => (
                    <img
                      onClick={() => this.handleEditor(selectedEC.id)}
                      src={src}
                      style={Object.assign(style, {
                        width: "70%",
                        cursor: "pointer"
                      })}
                    />
                  )}
                />
                <p
                  onClick={() => this.handleEditor(selectedEC.id)}
                  className="homePage__filter__content__editor__title"
                >
                  {selectedEC.name}
                </p>
                <div>
                  <span className="homePage__filter__content__editor__detail">
                    {selectedEC.area + " / " + selectedEC.days}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
