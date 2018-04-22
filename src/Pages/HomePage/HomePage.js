// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { NavBar, BoxList, Post } from "../../Components";
import ec from "../../Json/ec";
import { Button } from "reactstrap";
import nprogress from "nprogress";
import filterJson from "../../Json/filter";
import cx from "classnames";
import ProgressiveImage from "react-progressive-image";
import Textarea from "react-textarea-autosize";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

// import list from "../../Json/HotTopic.json";
const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

const styles = {
  customWidth: {
    width: 200,
    margin: 0,
    padding: 0
  },
  image: {
    height: 130,
    cursor: "pointer"
  },
  noMargin: {
    margin: 0
  }
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandNotice: false,
      selectedFeed: 0,
      selectedPost: 0,
      selectedEC: [],
      dropdownOpen: false,
      selectedPostType: "Walkie Talkie"
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentWillMount() {
    nprogress.start();
    const randomPackage = Math.floor(Math.random() * 26);
    const selectedEC = ec.editorChoice[randomPackage];
    this.setState({ selectedEC });
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

  handlePostType = type => {
    this.setState({ selectedPostType: type });
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

    const { selectedFeed, selectedPost, selectedEC, expandNotice } = this.state;
    return (
      <div className="homePage">
        <NavBar isActive="feed" listClassName="homePage__tabBar__list" />
        <div className="homePage__notice">
          <div className="homePage__notice__content">
            <div
              className={cx("homePage__notice__content__wrapper", {
                "homePage__notice__content__wrapper-expand":
                  expandNotice === true
              })}
            >
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
                <div
                  className={cx(
                    "homePage__notice__content__wrapper__list__bar",
                    "homePage__notice__content__wrapper__list__bar-comment"
                  )}
                />
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
                  className="homePage__notice__content__wrapper__more__text"
                  onClick={this.handleExpand}
                >
                  <i className="xi-arrow-down" /> See more
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
                <Textarea
                  maxRows={4}
                  placeholder="What's in your mind?"
                  className="homePage__feed__content__inputArea__body__input"
                />
              </div>
              <hr className="homePage__noMargin" />
              <div className="homePage__feed__content__inputArea__footer">
                <div className="homePage__feed__content__inputArea__footer__camera">
                  <span className="homePage__feed__content__inputArea__footer__camera__icon">
                    <i className="xi-camera" />
                  </span>
                </div>
                <div className="homePage__feed__content__inputArea__footer__postArea">
                  <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                    size="sm"
                    direction="down"
                  >
                    <DropdownToggle caret>
                      {this.state.selectedPostType}
                    </DropdownToggle>
                    <DropdownMenu>
                      {postType.map((data, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => this.handlePostType(data)}
                          >
                            {data}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </ButtonDropdown>
                  <span className="homePage__feed__content__inputArea__footer__postArea__postButton">
                    post
                  </span>
                </div>
              </div>
            </div>
            <Post
              text="hi My name is Shin Hyun Jong"
              createdAt="15min"
              writer="Shin Hyun Jong"
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTkRvzI1fzYv8I2Psxc9HG_33ttZApXI1jET59aaze6xwBrCJC"
              likeCount={24}
              commentCount={40}
            />
            <Post
              text="Hi Y'all. I really wanna meet Kim Jong Un one day."
              createdAt="2min"
              writer="Edgar Flores"
              img="https://dailynewshungary.com/wp-content/uploads/2017/01/us_army-1280x640.jpg"
              likeCount={1000}
              commentCount={210}
            />
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
                  src={selectedEC.image_url[0]}
                  placeholder={selectedEC.image_url[0]}
                >
                  {src => (
                    <img
                      src={src}
                      onClick={() => this.handleEditor(selectedEC.id)}
                      alt="an image"
                      style={styles.image}
                    />
                  )}
                </ProgressiveImage>
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
