// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { NavBar, BoxList, Post, Thumb, SocialInput } from "../../Components";
import ec from "../../Json/ec";
import { Button } from "reactstrap";
import nprogress from "nprogress";
import filterJson from "../../Json/filter";
import cx from "classnames";
import ProgressiveImage from "react-progressive-image";
import Textarea from "react-textarea-autosize";
import Badge from "material-ui/Badge";
import * as FeedAction from "../../ActionCreators/FeedAction";
import { Bounce } from "react-activity";
import FileInputComponent from "react-file-input-previews-base64";
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
    isLogin: state.reducer.isLogin,
    user: state.reducer.user,
    token: state.reducer.token,
    feeds: state.reducer.feeds
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
      height: window.innerHeight,
      message: "not at bottom",
      expandNotice: false,
      selectedFeed: 0,
      selectedPost: 0,
      feeds: [],
      feedText: "",
      selectedEC: [],
      dropdownOpen: false,
      selectedPostTypeIndex: 1,
      selectedPostType: "Walkie Talkie",
      imagePreview: []
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
    const { isLogin } = this.props;
    if (isLogin) {
      this.setState({ selectedEC, feedLoading: true });
      const params = {
        token: this.props.token,
        type: 0
      };
      this.props.dispatch(FeedAction.getAllFeed(params)).then(value => {
        const newFeeds = value.slice();
        for (let i = 0; i < newFeeds.length; i++) {
          newFeeds[i].images = value[i].images.map((data, index) => {
            return { original: data.img_url };
          });
        }
        this.setState({ feeds: newFeeds, feedLoading: false });
        nprogress.done();
      });
    } else {
      this.setState({ selectedEC });
      nprogress.done();
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleFeed = index => {
    this.setState({ selectedFeed: index });
  };

  handlePost = index => {
    const { isLogin } = this.props;
    const params = {
      token: this.props.token,
      type: index
    };
    if (!isLogin) {
      this.props.history.push({ pathname: "/signup" });
    } else {
      this.setState({ selectedPost: index, feedLoading: true });
      this.props.dispatch(FeedAction.getFeed(params)).then(value => {
        const newFeeds = value.slice();
        for (let i = 0; i < newFeeds.length; i++) {
          newFeeds[i].images = value[i].images.map((data, index) => {
            return { original: data.img_url };
          });
        }
        this.setState({ feeds: newFeeds, feedLoading: false });
      });
    }
  };

  handlePostType = (index, type) => {
    this.setState({ selectedPostType: type, selectedPostTypeIndex: index });
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

  handlePreview = file_arr => {
    let imagePreview = this.state.imagePreview.slice();
    for (let i = 0; i < file_arr.length; i++) {
      imagePreview.push(file_arr[i].base64);
    }
    this.setState({ imagePreview });
  };

  handleBadge = value => {
    let imagePreview = this.state.imagePreview.slice();
    imagePreview.splice(imagePreview.indexOf(value), 1);
    this.setState({ imagePreview });
  };

  handleText = e => {
    this.setState({ feedText: e.target.value });
  };

  handleAuth = () => {
    this.props.history.push({
      pathname: "/signup"
    });
  };

  handlePostFeed = () => {
    const { user, isLogin } = this.props;
    if (!isLogin) {
      this.props.history.push({
        pathname: "/signup"
      });
    } else {
      const {
        feedText,
        selectedPostTypeIndex,
        imagePreview,
        feeds
      } = this.state;
      const newFeeds = feeds.slice();

      let date = new Date();

      const params = {
        token: this.props.token,
        content: feedText,
        type: selectedPostTypeIndex,
        pic_list: imagePreview
      };

      const images = imagePreview.map((data, index) => {
        return { original: data };
      });
      const frontParams = {
        content: feedText,
        post_type: selectedPostTypeIndex,
        images,
        created_at: date,
        nickname: user.nickname,
        profile_img: user.profile_img
      };

      this.setState({ feedLoading: true });
      this.props.dispatch(FeedAction.postFeed(params)).then(value => {
        newFeeds.splice(0, 0, frontParams);
        this.setState({
          feedText: "",
          imagePreview: [],
          feedLoading: false,
          feeds: newFeeds
        });
      });
    }
  };

  render() {
    const feedType = filterJson.feed_type;
    const postType = filterJson.post_type;
    const {
      selectedFeed,
      selectedPost,
      selectedPostType,
      selectedEC,
      imagePreview,
      feeds,
      feedLoading
    } = this.state;
    const { isLogin, user } = this.props;
    if (isLogin) {
      return (
        <div className="homePage" onScroll={this.handleScroll}>
          <NavBar isActive="feed" listClassName="homePage__tabBar__list" />
          <div className="homePage__notice">
            <div className="homePage__notice__content">
              <div className="homePage__notice__content__wrapper">
                {user.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      textAlign: "center"
                    }}
                  >
                    <p>Join and get connected with people in USFK Community!</p>
                    <br />
                    <div
                      onClick={this.handleAuth}
                      className="homePage__filter__content__items__item-login"
                    >
                      <p className="homePage__filter__content__items__item-login-text">
                        Log in / Sign up
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>{"Welcome!!!! " + user.first_name + " " + user.last_name}</p>
                )}

                <hr />
              </div>
            </div>
          </div>
          <div className="homePage__feed">
            <div className="homePage__feed__content">
              <SocialInput
                placeholder="What's in your mind?"
                user={user}
                isLogin={isLogin}
                showType
                showCamera
                handleBase={this.handlePreview}
                handleType={this.handlePostType}
                handleDelete={this.handleBadge}
                imagePreview={imagePreview}
                selectedPostType={selectedPostType}
                onChange={this.handleText}
                onClick={this.handlePostFeed}
                value={this.state.feedText}
              />
              {feedLoading ? (
                <div className="homePage__feed__content-loading">
                  <Bounce size={30} color="#fdd835" />
                </div>
              ) : (
                feeds &&
                feeds.map((data, index) => {
                  return (
                    <Post
                      key={index}
                      // img={data.pic_list[0]}
                      profileImg={data.profile_img}
                      postType={data.post_type}
                      text={data.content}
                      images={data.images}
                      createdAt={data.created_at}
                      writer={data.nickname}
                    />
                  );
                })
              )}
              {feeds.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10%"
                  }}
                >
                  There are no posts yet.
                </div>
              ) : null}
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
                        className={cx(
                          "homePage__filter__content__items__item",
                          {
                            "homePage__filter__content__items__item-clicked":
                              selectedFeed === index
                          }
                        )}
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
                        className={cx(
                          "homePage__filter__content__items__item",
                          {
                            "homePage__filter__content__items__item-clicked":
                              selectedPost === index
                          }
                        )}
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
    } else {
      return (
        <div className="homePage">
          <NavBar isActive="feed" listClassName="homePage__tabBar__list" />

          <div className="homePage__welcome">
            <h2>로그인 안했을 때</h2>
          </div>
        </div>
      );
    }
  }

  handleScroll = e => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({
        message: "bottom reached"
      });
    } else {
      this.setState({
        message: "not at bottom"
      });
    }
  };
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
