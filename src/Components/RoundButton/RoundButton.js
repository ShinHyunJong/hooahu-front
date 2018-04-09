// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";

const defaultProps = {};
const propTypes = {};
import { Button } from "reactstrap";

import cx from "classnames";

class RoundButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      icon,
      text,
      iconClassName,
      textClassName,
      className,
      onClick
    } = this.props;
    return (
      <div className="roundButton">
        <Button
          onClick={onClick}
          className={cx("roundButton__content", className)}
        >
          <div className="roundButton__content__wrapper">
            <div className="roundButton__content__wrapper__textArea">
              <span
                className={
                  (cx("roundButton__content__wrapper__textArea__text"),
                  textClassName)
                }
              >
                {text}
              </span>
            </div>
          </div>
        </Button>
      </div>
    );
  }
}

RoundButton.defaultProps = defaultProps;
RoundButton.propTypes = propTypes;

export default RoundButton;
