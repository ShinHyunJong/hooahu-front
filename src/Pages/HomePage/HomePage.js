// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";

import { NavBar, Post, SocialInput, Comment } from "../../Components";
import { LandingPage } from "../../Pages";
import ec from "../../Json/ec";
import nprogress from "nprogress";
import filterJson from "../../Json/filter";
import cx from "classnames";
import ProgressiveImage from "react-progressive-image";
import ContentLoader from "react-content-loader";
import * as FeedAction from "../../ActionCreators/FeedAction";
import * as AuthAction from "../../ActionCreators/AuthAction";
import * as UserAction from "../../ActionCreators/UserAction";
import { Bounce } from "react-activity";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import FlipMove from "react-flip-move";

// import list from "../../Json/HotTopic.json";
const defaultProps = {};
const propTypes = {};

const MyLoader = props => (
  <div className="homePage__feed__content-loading">
    <ContentLoader
      height={160}
      width={400}
      speed={2}
      primaryColor="#a8a8a8"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="69" y="33" rx="3" ry="3" width="117" height="5" />
      <rect x="69" y="51" rx="3" ry="3" width="85" height="5" />
      <rect x="15.02" y="81.63" rx="3" ry="3" width="320" height="5" />
      <rect x="15" y="98" rx="3" ry="3" width="350" height="5" />
      <rect x="15" y="116" rx="3" ry="3" width="201" height="5" />
      <circle cx="39.2" cy="45.2" r="16" />
    </ContentLoader>
  </div>
);

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
      email: "",
      password: "",
      height: window.innerHeight,
      message: "not at bottom",
      isPosting: false,
      expandNotice: false,
      selectedFeed: 0,
      selectedPost: 0,
      feeds: [],
      feedText: "",
      feedLoading: true,
      selectedEC: [],
      dropdownOpen: false,
      selectedPostTypeIndex: 1,
      selectedPostType: "Walkie Talkie",
      selectedPostIndex: 0,
      showModal: false,
      imagePreview: [],
      comment: "",
      tags: []
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
    const { isLogin, dispatch } = this.props;
    if (isLogin) {
      this.setState({ selectedEC, feedLoading: true });
      const params = {
        token: this.props.token,
        type: 0
      };
      dispatch(FeedAction.getAllFeed(params)).then(value => {
        const newFeeds = value.slice();
        for (let i = 0; i < newFeeds.length; i++) {
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
      selectedEC,
      selectedComment,
      showModal,
      imagePreview,
      feeds,
      feedLoading,
      comment,
      isPosting,
      tags
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
            <ModalFooter>
              <span
                onClick={this.toggleModal}
                className="editorDetail__modal__close"
              >
                <i className="xi-close" />
              </span>
            </ModalFooter>
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
                showTag
                handleBase={this.handlePreview}
                handleType={this.handlePostType}
                handleDelete={this.handleBadge}
                imagePreview={imagePreview}
                selectedPostType={selectedPostType}
                onChange={this.handleText}
                tagsValue={tags}
                onChangeTags={this.handleTags}
                onChangeTagsInput={tags => this.setState({ tags })}
                onClick={this.handlePostFeed}
                value={this.state.feedText}
              />

              {feedLoading ? (
                <div>
                  <MyLoader />
                  <MyLoader />
                </div>
              ) : isPosting ? (
                <div className="homePage__feed__content-isPosting">
                  <Bounce size={35} color="#fdd835" />
                </div>
              ) : (
                <FlipMove
                  enterAnimation="fade"
                  leaveAnimation="fade"
                  delay={150}
                >
                  {feeds &&
                    feeds.map((data, index) => {
                      return (
                        <Post
                          feed={data}
                          key={index}
                          index={index}
                          onClickThumb={this.handleUser}
                          onClickUser={this.handleUser}
                          onClickComment={this.handleComment}
                          onClickCommentUser={this.handleUser}
                          onClickLike={id => this.handleLike(id, index)}
                          onClickDisLike={id => this.handleDisLike(id, index)}
                        />
                      );
                    })}
                </FlipMove>
              )}
              {feeds.length === 0 && !feedLoading ? (
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
                        alt={selectedEC.id}
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
        this.setState({ selectedPost: index, isPosting: true });
        this.props.dispatch(FeedAction.getAllFeed(params)).then(value => {
          const newFeeds = value.slice();
          for (let i = 0; i < newFeeds.length; i++) {
            // newFeeds[i].comments = newFeeds[i].comments.reverse();
            newFeeds[i].images = value[i].images.map((data, index) => {
              return { original: data.img_url };
            });
          }
          this.setState({ feeds: newFeeds, isPosting: false });
        });
      } else {
        this.setState({ selectedPost: index, isPosting: true });
        this.props.dispatch(FeedAction.getFeed(params)).then(value => {
          const newFeeds = value.slice();
          for (let i = 0; i < newFeeds.length; i++) {
            // newFeeds[i].comments = newFeeds[i].comments.reverse();
            newFeeds[i].images = value[i].images.map((data, index) => {
              return { original: data.img_url };
            });
          }
          this.setState({ feeds: newFeeds, isPosting: false });
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
    const { user, isLogin, token } = this.props;
    if (!isLogin) {
      this.props.history.push({
        pathname: "/signup"
      });
    } else {
      const {
        feedText,
        selectedPostTypeIndex,
        imagePreview,
        feeds,
        tags
      } = this.state;
      const newFeeds = feeds.slice();
      let date = new Date();

      const params = {
        token,
        content: feedText,
        tags,
        type: selectedPostTypeIndex,
        pic_list: imagePreview
      };

      const images = imagePreview.map((data, index) => {
        return { original: data };
      });

      let newTags = [];
      if (tags.length === 0) {
        newTags = [];
      } else {
        tags.map((data, index) => {
          newTags.push({ title: data });
        });
      }
      this.setState(state => ({ isPosting: true }));
      this.props.dispatch(FeedAction.postFeed(params)).then(value => {
        const frontParams = {
          id: value.newPostId,
          content: feedText,
          post_type: selectedPostTypeIndex,
          images,
          comments: [],
          tags: newTags,
          created_at: date,
          nickname: user.nickname,
          like_cnt: 0,
          isLiked: false,
          profile_img: user.profile_img
        };
        newFeeds.splice(0, 0, frontParams);
        this.setState(state => ({
          feedText: "",
          imagePreview: [],
          tags: [],
          isPosting: false,
          feeds: newFeeds
        }));
      });
    }
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !this.state.showModal
    }));
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
      // showModal: true
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

  handleTags = tags => {
    const hashTags = tags
      .filter(a => {
        return a !== "#";
      })
      .map(tag => {
        tag = tag.replace(/#/g, "");
        return `#${tag}`;
      });
    this.setState({ tags: _.uniq(hashTags) });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleSignIn = () => {
    const randomPackage = Math.floor(Math.random() * 26);
    const selectedEC = ec.editorChoice[randomPackage];
    const { email, password } = this.state;
    const params = { email, password };
    if (email === "") {
      alert("Check Again");
    } else {
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
    }
  };
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
