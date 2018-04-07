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
    let { icon, text, iconClassName, textClassName, className } = this.props;
    return (
      <div className="roundButton">
        <Button className={cx("roundButton__content", className)}>
          <div className="roundButton__content__wrapper">
            <span
              className={
                (cx("roundButton__content__wrapper__icon"), iconClassName)
              }
            >
              <i className={icon} />
            </span>
            <span
              className={
                (cx("roundButton__content__wrapper__text"), textClassName)
              }
            >
              {text}
            </span>
          </div>
        </Button>
      </div>
    );
  }
}

RoundButton.defaultProps = defaultProps;
RoundButton.propTypes = propTypes;

export default RoundButton;
