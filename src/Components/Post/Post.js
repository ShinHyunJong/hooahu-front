// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import cx from "classnames";

const defaultProps = {};
const propTypes = {};
const styles = {
  noMargin: {
    margin: 0
  }
};

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      writer,
      postType,
      createdAt,
      text,
      likeCount,
      commentCount,
      img
    } = this.props;
    return (
      <div className="post">
        <div className="post__header">
          <div className="post__header__userInfo">
            <div className="post__header__userInfo__thumb">
              <span className="post__header__userInfo__thumb__icon">
                <i className="xi-user-o" />
              </span>
            </div>
            <div className="post__header__userInfo__nameArea">
              <p className="post__header__userInfo__nameArea__name">
                <strong className="homePage__strong">{writer && writer}</strong>
                {"in " + postType && postType}
              </p>
              <p className="post__header__userInfo__nameArea__time">
                {createdAt && createdAt + " ago"}
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
          <p className="post__body__text">{text && text}</p>
          <div className="post__body__imageArea">
            <img className="post__body__imageArea__image" src={img} />
          </div>
        </div>
        <hr style={styles.noMargin} />
        <div className="post__footer">
          <div className="post__footer__wrapper">
            <div className="post__footer__wrapper__likeArea">
              <div className="post__footer__wrapper__likeArea__count">
                {likeCount && likeCount}
              </div>
              <span className="post__footer__wrapper__likeArea__icon">
                <i className="xi-heart-o" />
              </span>
            </div>
            <div className="post__footer__wrapper__commentArea">
              <div className="post__footer__wrapper__commentArea__count">
                {commentCount && commentCount}
              </div>
              <span className="post__footer__wrapper__commentArea__icon">
                <i className="xi-speech-o" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.defaultProps = defaultProps;
Post.propTypes = propTypes;

export default Post;
