// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";
import * as FeedAction from "../../ActionCreators/FeedAction";

import { NavBar, Post, Thumb, SocialInput, Comment } from "../../Components";
import ec from "../../Json/ec";
import nprogress from "nprogress";
import filterJson from "../../Json/filter";
import cx from "classnames";
import ContentLoader from "react-content-loader";
import ProgressiveImage from "react-progressive-image";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

const defaultProps = {};
const propTypes = {};

const MyLoader = props => (
  <div className="userPage__notice__content-loader">
    <ContentLoader
      height={330}
      width={400}
      speed={2}
      primaryColor="#a8a8a8"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="110" y="200" rx="3" ry="3" width="190" height="10" />
      <rect x="110" y="270" rx="3" ry="3" width="190" height="15" />
      <rect x="45" y="310" rx="3" ry="3" width="300" height="10" />
      <circle cx="200" cy="80" r="80" />
    </ContentLoader>
  </div>
);

const mapStateToProps = state => {
  return {
    isLogin: state.reducer.isLogin,
    user: state.reducer.user,
    token: state.reducer.token
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

class TagPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      index: 0,
      selectedEC: [],
      selectedFeed: 0,
      selectedPost: 0,
      showModal: false,
      dropdownOpen: false,
      tagLoading: true,
      selectedPostIndex: 0,
      selectedComment: [],
      isPosting: false,
      comment: "",
      feeds: []
    };
  }

  componentWillMount() {
    nprogress.start();
    const randomPackage = Math.floor(Math.random() * 26);
    const selectedEC = ec.editorChoice[randomPackage];
    this.setState({ selectedEC });
    this.getAllFeeds();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      previousProps.match.params.tag_name !== this.props.match.params.tag_name
    ) {
      console.log("!!");
      this.getAllFeeds();
    }
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    const { isLogin, user, match } = this.props;
    const {
      selectedEC,
      selectedPost,
      selectedFeed,
      feeds,
      tagLoading,
      showModal,
      isPosting,
      selectedComment,
      comment
    } = this.state;
    const feedType = filterJson.feed_type;
    const postType = filterJson.post_type;
    return (
      <div className="tagPage">
        <NavBar listClassName="tagPage__tabBar__list" />
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
        <div className="tagPage__notice">
          {tagLoading ? (
            <MyLoader />
          ) : (
            <div className="tagPage__notice__content">
              <div className="tagPage__notice__content__wrapper">
                <Thumb isTag size={100} fontSize={60} />
                <p className="tagPage__notice__content__wrapper__tagName">{`#${
                  match.params.tag_name
                }`}</p>
                <p className="tagPage__notice__content__wrapper__tagCount">
                  <span className="tagPage__notice__content__wrapper__tagCount-number">
                    {feeds.length}
                  </span>{" "}
                  Posts
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="tagPage__feed">
          <div className="tagPage__feed__content">
            {feeds &&
              feeds.map((data, index) => {
                return (
                  <Post
                    isTag
                    feed={data}
                    key={index}
                    index={index}
                    onClickTag={this.handleTag}
                    onClickThumb={this.handleUser}
                    onClickUser={this.handleUser}
                    onClickComment={this.handleComment}
                    onClickCommentUser={this.handleUser}
                    onClickLike={id => this.handleLike(id, index)}
                    onClickDisLike={id => this.handleDisLike(id, index)}
                  />
                );
              })}
          </div>
        </div>
        <div className="tagPage__filter">
          <div className="tagPage__filter__wrapper">
            <div className="tagPage__filter__content">
              <div className="tagPage__filter__content__label">
                <p className="tagPage__filter__content__label__text">
                  Post Types
                </p>
              </div>
              <div className="tagPage__filter__content__items">
                {postType.map((data, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => this.handlePost(index)}
                      className={cx("tagPage__filter__content__items__item", {
                        "tagPage__filter__content__items__item-clicked":
                          selectedPost === index
                      })}
                    >
                      {data}
                    </div>
                  );
                })}
              </div>
              <hr />
              <div className="tagPage__filter__content__editor">
                <p className="tagPage__filter__content__editor__label">
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
                  className="tagPage__filter__content__editor__title"
                >
                  {selectedEC.name}
                </p>
                <div>
                  <span className="tagPage__filter__content__editor__detail">
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

  getAllFeeds = () => {
    const { match, dispatch, token } = this.props;
    const tag_name = match.params.tag_name;
    const params = { tag_name, token, index: 0 };
    dispatch(FeedAction.getFeedsByTagName(params)).then(feeds => {
      const newFeeds = feeds.result.slice();
      for (let i = 0; i < newFeeds.length; i++) {
        if (newFeeds[i].isLiked) {
          newFeeds[i].isLiked = true;
        }
        newFeeds[i].images = feeds.result[i].images.map((data, index) => {
          return { original: data.img_url };
        });
      }
      this.setState(state => ({ feeds: newFeeds, tagLoading: false }));
    });
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

  toggleModal = () => {
    this.setState(state => ({
      showModal: !this.state.showModal
    }));
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

  handleUser = user_id => {
    const { history } = this.props;
    history.push({
      pathname: "/@" + user_id
    });
  };

  handleEditor = id => {
    this.props.history.push({
      pathname: "/editor_choice/" + id
    });
  };

  handleInput = e => {
    this.setState({ comment: e.target.value });
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

  handleTag = name => {
    name = name.substring(1);
    const { history } = this.props;
    history.push({
      pathname: "/tag/" + name
    });
  };
}

TagPage.defaultProps = defaultProps;
TagPage.propTypes = propTypes;

export default connect(mapStateToProps)(TagPage);
