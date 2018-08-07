// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import {
  NavBar,
  BoxList,
  Post,
  Thumb,
  SocialInput,
  Comment
} from "../../Components";
import { LandingPage } from "../../Pages";
import ec from "../../Json/ec";
import { Button } from "reactstrap";
import nprogress from "nprogress";
import filterJson from "../../Json/filter";
import cx from "classnames";
import ProgressiveImage from "react-progressive-image";
import Textarea from "react-textarea-autosize";
import Badge from "material-ui/Badge";
import * as FeedAction from "../../ActionCreators/FeedAction";
import * as AuthAction from "../../ActionCreators/AuthAction";
import * as UserAction from "../../ActionCreators/UserAction";
import { Bounce } from "react-activity";
import FileInputComponent from "react-file-input-previews-base64";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody
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
      isPosting: false,
      expandNotice: false,
      selectedFeed: 0,
      selectedPost: 0,
      feeds: [],
      feedText: "",
      selectedEC: [],
      dropdownOpen: false,
      selectedPostTypeIndex: 1,
      selectedPostType: "Walkie Talkie",
      selectedPostIndex: 0,
      showModal: false,
      imagePreview: [],
      comment: ""
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
          // newFeeds[i].comments = newFeeds[i].comments.reverse();
          if (newFeeds[i].isLiked) {
            newFeeds[i].isLiked = true;
          }
          newFeeds[i].images = value[i].images.map((data, index) => {
            return { original: data.img_url };
          });
        }

        // let result = newFeeds.map(function(el) {
        //   let o = Object.assign({}, el);
        //   o.isLiked = false;
        //   return o;
        // });

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

  render() {
    const feedType = filterJson.feed_type;
    const postType = filterJson.post_type_filter;
    const {
      selectedFeed,
      selectedPost,
      selectedPostType,
      selectedPostIndex,
      selectedEC,
      selectedComment,
      showModal,
      imagePreview,
      feeds,
      feedLoading,
      comment,
      isPosting
    } = this.state;
    const { isLogin, user } = this.props;

    if (isLogin) {
      return (
        <div className="homePage" onScroll={this.handleScroll}>
          <NavBar isActive="feed" listClassName="homePage__tabBar__list" />
          <Modal
            isOpen={showModal}
            toggle={this.toggleModal}
            wrapClassName="hooahu__modal"
            size="lg"
            modalTransition={{ timeout: 20 }}
            backdropTransition={{ timeout: 10 }}
            centered={true}
          >
            <ModalBody>
              <div className="editorDetail__modal">
                <div className="editorDetail__modal__comment">
                  <Comment isFeed comment={selectedComment} />
                </div>
                <SocialInput
                  className="editorDetail__modal__input"
                  user={user}
                  value={comment}
                  isLogin={isLogin}
                  isPosting={isPosting}
                  onChange={this.handleInput}
                  placeholder="Leave a comment"
                  onClick={this.handlePostComment}
                />
              </div>
            </ModalBody>
          </Modal>
          <div className="homePage__notice">
            <div className="homePage__notice__content">
              <div className="homePage__notice__content__wrapper">
                <p>{`WelCome! ${user.first_name} ${user.last_name}`}</p>
                <hr />
              </div>
            </div>
          </div>
          <div className="homePage__feed">
            <div className="homePage__feed__content">
              <SocialInput
                placeholder="What's in your mind????"
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
                      feed={data}
                      key={index}
                      index={index}
                      onClickThumb={this.handleUser}
                      onClickComment={this.handleComment}
                      onClickLike={id => this.handleLike(id, index)}
                      onClickDisLike={id => this.handleDisLike(id, index)}
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
        <LandingPage
          onChangeEmail={this.handleEmail}
          onChangePassword={this.handlePassword}
          onClickSign={this.handleSignIn}
        />
      );
    }
  }

  // handleScroll = e => {
  //   const windowHeight =
  //     "innerHeight" in window
  //       ? window.innerHeight
  //       : document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(
  //     body.scrollHeight,
  //     body.offsetHeight,
  //     html.clientHeight,
  //     html.scrollHeight,
  //     html.offsetHeight
  //   );
  //   const windowBottom = windowHeight + window.pageYOffset;
  //   if (windowBottom >= docHeight) {
  //     this.setState({
  //       message: "bottom reached"
  //     });
  //   } else {
  //     this.setState({
  //       message: "not at bottom"
  //     });
  //   }
  // };

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
      if (index === 0) {
        this.setState({ selectedPost: index, feedLoading: true });
        this.props.dispatch(FeedAction.getAllFeed(params)).then(value => {
          const newFeeds = value.slice();
          for (let i = 0; i < newFeeds.length; i++) {
            // newFeeds[i].comments = newFeeds[i].comments.reverse();
            newFeeds[i].images = value[i].images.map((data, index) => {
              return { original: data.img_url };
            });
          }
          this.setState({ feeds: newFeeds, feedLoading: false });
        });
      } else {
        this.setState({ selectedPost: index, feedLoading: true });
        this.props.dispatch(FeedAction.getFeed(params)).then(value => {
          const newFeeds = value.slice();
          for (let i = 0; i < newFeeds.length; i++) {
            // newFeeds[i].comments = newFeeds[i].comments.reverse();
            newFeeds[i].images = value[i].images.map((data, index) => {
              return { original: data.img_url };
            });
          }
          this.setState({ feeds: newFeeds, feedLoading: false });
        });
      }
    }
  };

  handlePostComment = () => {
    const { dispatch, token, user } = this.props;
    const { comment, selectedPostIndex, selectedComment, feeds } = this.state;
    const newFeed = feeds.slice();
    newFeed.map((data, index) => {
      if (data.id === selectedPostIndex) {
        data.comments.push({
          content: comment,
          post_id: selectedPostIndex,
          id: selectedComment.length,
          nickname: user.nickname,
          created_at: new Date()
        });
      }
    });

    const params = { post_id: selectedPostIndex, content: comment, token };
    this.setState(state => ({ isPosting: true, feeds: newFeed }));
    dispatch(FeedAction.postComment(params)).then(value => {
      this.setState(state => ({ isPosting: false, comment: "" }));
    });
  };

  handlePostType = (index, type) => {
    this.setState({ selectedPostType: type, selectedPostTypeIndex: index + 1 });
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

      this.setState({ feedLoading: true });
      this.props.dispatch(FeedAction.postFeed(params)).then(value => {
        const frontParams = {
          id: value.newPostId,
          content: feedText,
          post_type: selectedPostTypeIndex,
          images,
          comments: [],
          created_at: date,
          nickname: user.nickname,
          like_cnt: 0,
          isLiked: false,
          profile_img: user.profile_img
        };
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

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  handleInput = e => {
    this.setState({ comment: e.target.value });
  };

  handleLike = (id, index) => {
    const { dispatch, token } = this.props;
    const { feeds } = this.state;
    const params = { token, post_id: id };
    const newFeeds = feeds.slice();
    newFeeds[index].isLiked = true;
    newFeeds[index].like_cnt += 1;
    this.setState(state => ({ feeds: newFeeds }));
    dispatch(FeedAction.postLike(params));
  };

  handleDisLike = (id, index) => {
    const { dispatch, token } = this.props;
    const params = { token, post_id: id };
    const { feeds } = this.state;
    const newFeeds = feeds.slice();
    newFeeds[index].isLiked = false;
    newFeeds[index].like_cnt -= 1;
    this.setState(state => ({ feeds: newFeeds }));
    dispatch(FeedAction.disLike(params));
  };

  handleComment = (id, comments) => {
    this.setState(state => ({
      selectedPostIndex: id,
      selectedComment: comments
    }));
    this.toggleModal();
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleUser = user_id => {
    const { history } = this.props;
    history.push({
      pathname: "/@" + user_id
    });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleSignIn = () => {
    const randomPackage = Math.floor(Math.random() * 26);
    const selectedEC = ec.editorChoice[randomPackage];
    const params = { email: this.state.email, password: this.state.password };
    this.props.dispatch(AuthAction.postSignIn(params)).then(async value => {
      if (value === "failed") {
        return null;
      } else {
        await this.props.dispatch(UserAction.getUser(value));
        await this.props.history.push({
          pathname: "/"
        });
        nprogress.start();
        this.setState({ selectedEC, feedLoading: true });
        const params = {
          token: this.props.token,
          type: 0
        };
        this.props.dispatch(FeedAction.getAllFeed(params)).then(value => {
          const newFeeds = value.slice();
          for (let i = 0; i < newFeeds.length; i++) {
            // newFeeds[i].comments = newFeeds[i].comments.reverse();
            if (newFeeds[i].isLiked) {
              newFeeds[i].isLiked = true;
            }
            newFeeds[i].images = value[i].images.map((data, index) => {
              return { original: data.img_url };
            });
          }

          this.setState({ feeds: newFeeds, feedLoading: false });
          nprogress.done();
        });
      }
    });
  };
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
