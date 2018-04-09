// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { NavBar, BoxList } from "../../Components";
import ec from "../../Json/ec";
import { Button } from "reactstrap";
// import list from "../../Json/HotTopic.json";
const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(DefaultActionCreator.action());
  }

  render() {
    return (
      <div className="homePage">
        <header>
          <NavBar listClassName="homePage__tabBar__list" />
        </header>
        <div className="homePage__header">
          <div className="homePage__header__title">
            <h1 className="homePage__header__title__text">HOOAH!U</h1>
            <h4 className="homePage__header__title__subTitle">
              Platform for U.S ARMY
            </h4>
          </div>
          <div className="homePage__header__box">
            <div className="homePage__header__box__hotTopic">
              <div className="homePage__header__box__hotTopic__content">
                <h3 className="homePage__header__box__hotTopic__content__title">
                  Hot Topic
                </h3>
                {/* <BoxList list={list.hotTopic} /> */}
                <p className="homePage__header__box__newDiscussion__content__text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris ullamcorper commodo mauris nec facilisis. Donec quis
                  porta tellus, nec interdum dui. Morbi non consequat ipsum.
                  Donec a risus volutpat, vestibulum mi ac, egestas mauris.
                  Aliquam malesuada porta urna at rhoncus. Nunc ut mattis massa.
                  Donec vel risus sit amet quam viverra consectetur. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className="homePage__header__box__newDiscussion">
              <div className="homePage__header__box__newDiscussion__content">
                <h3 className="homePage__header__box__newDiscussion__content__title">
                  New Discussion
                </h3>
                <p className="homePage__header__box__newDiscussion__content__text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris ullamcorper commodo mauris nec facilisis. Donec quis
                  porta tellus, nec interdum dui. Morbi non consequat ipsum.
                  Donec a risus volutpat, vestibulum mi ac, egestas mauris.
                  Aliquam malesuada porta urna at rhoncus. Nunc ut mattis massa.
                  Donec vel risus sit amet quam viverra consectetur. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className="homePage__header__box__featuredPlace">
              <div className="homePage__header__box__featuredPlace__content">
                <h3 className="homePage__header__box__featuredPlace__content__title">
                  Featured Place
                </h3>
                <p className="homePage__header__box__featuredPlace__content__text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris ullamcorper commodo mauris nec facilisis. Donec quis
                  porta tellus, nec interdum dui. Morbi non consequat ipsum.
                  Donec a risus volutpat, vestibulum mi ac, egestas mauris.
                  Aliquam malesuada porta urna at rhoncus. Nunc ut mattis massa.
                  Donec vel risus sit amet quam viverra consectetur. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="homePage__header__down">
            <span className="homePage__header__down__icon">
              <i className="xi-angle-down" />
            </span>
          </div>
        </div>
        <div className="homePage__body">
          <Button color="danger">테스트</Button>
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = defaultProps;
HomePage.propTypes = propTypes;

export default connect(mapStateToProps)(HomePage);
