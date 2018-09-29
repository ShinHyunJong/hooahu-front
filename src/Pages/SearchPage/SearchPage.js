// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar } from "../../Components";
import { parseSearch } from "../../Utils/parseSearch";
import * as FeedAction from "../../ActionCreators/FeedAction";
import { Container, Row, Col } from "reactstrap";
import filterJson from "../../Json/filter";
import ec from "../../Json/ec";
import cx from "classnames";
import NumberFormat from "react-number-format";
import ProgressiveImage from "react-progressive-image-loading";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    token: state.reducer.token
  };
};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      users: []
    };
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    const { keyword } = parseSearch(location.search);
    this.setState({ keyword });
    const params = { props: this.props, keyword };
    dispatch(FeedAction.searchUser(params)).then(users =>
      this.setState({ users })
    );
  }

  componentDidUpdate(nextProps) {}

  onPressSearch = e => {
    const { history } = this.props;
    if (e.key === "Enter") {
      const { keyword } = this.state;
      const params = { props: this.props, keyword };
      this.props
        .dispatch(FeedAction.searchUser(params))
        .then(users => this.setState({ users }));
      history.push({ pathname: "/search", search: `?keyword=${keyword}` });
    }
  };

  render() {
    const { keyword, users } = this.state;
    return (
      <div className="searchPage">
        <NavBar
          searchValue={keyword}
          onChangeSearch={e => this.setState({ keyword: e.target.value })}
          onPressSearch={this.onPressSearch}
        />
        <div className="searchPage__notice">
          <div className="searchPage__notice__content">
            <div className="searchPage__notice__content__wrapper">users</div>
          </div>
        </div>
        <div className="searchPage__feed">
          <div className="searchPage__feed__content">
            <div className="searchPage__feed__content__header" />
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.defaultProps = defaultProps;
SearchPage.propTypes = propTypes;

export default connect(mapStateToProps)(SearchPage);
