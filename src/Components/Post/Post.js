// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import cx from "classnames";
import moment from "moment";
import NumericLabel from "react-pretty-numbers";
import { Thumb, Comment } from "../";
import ImageGallery from "react-image-gallery";

const defaultProps = {};
const propTypes = {};
const styles = {
  noMargin: {
    margin: 0
  }
};
let option = {
  title: true,
  shortFormat: true,
  shortFormatMinValue: 10000,
  shortFormatPrecision: 1
};

class Post extends Component {
  constructor(props) {
    super(props);
  }

  handlePostType = postType => {
    if (postType === 1) {
      return "Walkie Takie";
    } else if (postType === 2) {
      return "Question";
    } else if (postType === 3) {
      return "Selling/Giving Away";
    } else if (postType === 4) {
      return "HangOut";
    } else if (postType === 5) {
      return "Area1";
    } else if (postType === 6) {
      return "Area2";
    } else if (postType === 7) {
      return "Area3";
    } else if (postType === 8) {
      return "Area4";
    } else if (postType === 9) {
      return "KATUSA";
    } else if (postType === 10) {
      return "Ville Channel";
    } else {
      return "Walkie Takie";
    }
  };

  render() {
    const {
      id,
      writer,
      postType,
      createdAt,
      text,
      likeCount,
      images,
      comments,
      profileImg,
      onClickComment
    } = this.props;
    return (
      <div className="post">
        <div className="post__header">
          <div className="post__header__userInfo">
            <div className="post__header__userInfo__thumb">
              <Thumb size={50} src={profileImg} />
            </div>
            <div className="post__header__userInfo__nameArea">
              <p className="post__header__userInfo__nameArea__name">
                <strong className="homePage__strong">{writer && writer}</strong>
                {"in " + this.handlePostType(postType)}
              </p>
              <p className="post__header__userInfo__nameArea__time">
                {createdAt && moment(createdAt).fromNow()}
              </p>
            </div>
          </div>
          <div className="post__header__option">
            <span className="post__header__option__icon">
              <i className="xi-ellipsis-h" />
            </span>
          </div>
        </div>
        <div className="post__body">
          {images === null ||
          images === undefined ||
          images.length === 0 ? null : (
              <ImageGallery
                items={images}
                showThumbnails={false}
                showPlayButton={false}
                showBullets={true}
              />
            )}
          <div className="post__body__tags">
            <span className="post__body__tags__tag">
              <i className="xi-tag" />
              MP
            </span>
          </div>
          <p className="post__body__text">{text && text}</p>
        </div>
        <hr style={styles.noMargin} />
        <div className="post__footer">
          <div className="post__footer__wrapper">
            <div className="post__footer__wrapper__likeArea">
              <div className="post__footer__wrapper__likeArea__count">
                <NumericLabel params={option}>
                  {likeCount && likeCount}
                </NumericLabel>
              </div>
              <span className="post__footer__wrapper__likeArea__icon">
                <i className="xi-heart-o" />
              </span>
            </div>
            <div className="post__footer__wrapper__commentArea">
              <div className="post__footer__wrapper__commentArea__count">
                {comments && comments.length}
              </div>
              <span
                className="post__footer__wrapper__commentArea__icon"
                onClick={() => onClickComment(id, comments)}
              >
                <i className="xi-speech-o" />
              </span>
            </div>
          </div>
        </div>
        <hr style={styles.noMargin} />
        <div className="post__footer__wrapper__commentList">
          <Comment
            isFeed
            comment={
              comments && comments.slice(comments.length - 3, comments.length)
            }
          />
        </div>
      </div>
    );
  }
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
