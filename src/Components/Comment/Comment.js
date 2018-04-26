// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import moment from "moment";

const defaultProps = {};
const propTypes = {};

class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comment } = this.props;
    return (
      <div className="comment">
        {comment &&
          comment.map((data, index) => {
            return (
              <div key={index} className="comment__wrapper">
                <div className="comment-content">
                  <strong className="comment-name">{data.nickname}</strong>
                  {data.comment}
                </div>
                <p className="comment-date">
                  {moment(data.created_at).fromNow()}
                </p>
              </div>
            );
          })}
      </div>
    );
  }
}

Comment.defaultProps = defaultProps;
Comment.propTypes = propTypes;

export default Comment;
