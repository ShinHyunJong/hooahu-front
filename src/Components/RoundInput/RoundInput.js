// This Component is Skeleton of React Structure for Web Development
// If you want to make other Component, Copy and Refactor this Component.

import React, { Component } from "react";
import { Input } from "reactstrap";

const defaultProps = {};
const propTypes = {};

class RoundInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type, onChange, placeholder } = this.props;
    return (
      <div className="roundInput">
        <input
          className="roundInput__content"
          type={type}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

RoundInput.defaultProps = defaultProps;
RoundInput.propTypes = propTypes;

export default RoundInput;
