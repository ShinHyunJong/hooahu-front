// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import * as UserAction from "../../ActionCreators/UserAction";
import { NavBar, BoxList, Post, Thumb } from "../../Components";
import ec from "../../Json/ec";
import { Button } from "reactstrap";
import nprogress from "nprogress";
import filterJson from "../../Json/filter";
import cx from "classnames";
import ProgressiveImage from "react-progressive-image";
import Textarea from "react-textarea-autosize";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

// import list from "../../Json/HotTopic.json";
const defaultProps = {};
const propTypes = {};

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

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      selectedEC: [],
      selectedFeed: 0,
      selectedPost: 0,
      dropdownOpen: false,
      selectedPostType: "Walkie Talkie"
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentWillMount() {
    const { match, dispatch, token } = this.props;
    nprogress.start();
    const randomPackage = Math.floor(Math.random() * 26);
    const selectedEC = ec.editorChoice[randomPackage];
    const user_id = Number(match.params.user_id);
    const params = { user_id, token };

    dispatch(UserAction.getUserByUserID(params)).then(user =>
      this.setState({ user })
    );

    this.setState({ selectedEC });
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    const { isLogin } = this.props;
    const { selectedEC, selectedPost, selectedFeed, user } = this.state;
    const feedType = filterJson.feed_type;
    const postType = filterJson.post_type;
    return (
      <div className="userPage">
        <NavBar listClassName="userPage__tabBar__list" />
        <div className="userPage__notice">
          <div className="userPage__notice__content">
            <div className="userPage__notice__content__wrapper">
              <Thumb size={100} src={user && user.profile_img} fontSize={60} />
              <div className="userPage__notice__content__wrapper__name">
                <p>{`${user && user.first_name} ${user && user.last_name}`}</p>
              </div>
              <div className="userPage__notice__content__wrapper__info">
                {user && user.type === "Civ" ? (
                  <p>{user && user.c_type}</p>
                ) : (
                  <p>Military Personnel</p>
                )}
              </div>
              <div className="userPage__notice__content__wrapper__area">
                {user && user.area}
              </div>
            </div>
          </div>
        </div>
        <div className="userPage__feed">
          <div className="userPage__feed__content">
            <div className="userPage__feed__content__inputArea">
              <div className="userPage__feed__content__inputArea__body">
                <div className="userPage__feed__content__inputArea__body__thumbArea">
                  <Thumb size={50} src={user && user.profile_img} />
                </div>
                <Textarea
                  maxRows={4}
                  placeholder={
                    isLogin === true
                      ? "What's in your mind?"
                      : "Sign in to post!"
                  }
                  className="userPage__feed__content__inputArea__body__input"
                />
              </div>
              <hr className="userPage__noMargin" />
              <div className="userPage__feed__content__inputArea__footer">
                <div className="userPage__feed__content__inputArea__footer__camera">
                  <span className="userPage__feed__content__inputArea__footer__camera__icon">
                    <i className="xi-camera" />
                  </span>
                </div>
                <div className="userPage__feed__content__inputArea__footer__postArea">
                  <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                    size="sm"
                    direction="down"
                  >
                    <DropdownToggle caret>
                      {this.state.selectedPostType}
                    </DropdownToggle>
                    <DropdownMenu>
                      {postType.map((data, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => this.handlePostType(data)}
                          >
                            {data}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </ButtonDropdown>
                  <span className="userPage__feed__content__inputArea__footer__postArea__postButton">
                    post
                  </span>
                </div>
              </div>
            </div>
            {/* <Post
              text="hi My name is Shin Hyun Jong"
              createdAt="15min"
              writer="Shin Hyun Jong"
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTkRvzI1fzYv8I2Psxc9HG_33ttZApXI1jET59aaze6xwBrCJC"
              likeCount={24}
              commentCount={40}
              profileImg={user && user.profile_img}
            /> */}
          </div>
        </div>
        <div className="userPage__filter">
          <div className="userPage__filter__wrapper">
            <div className="userPage__filter__content">
              <div className="userPage__filter__content__label">
                <p className="userPage__filter__content__label__text">
                  Post Types
                </p>
              </div>
              <div className="userPage__filter__content__items">
                {postType.map((data, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => this.handlePost(index)}
                      className={cx("userPage__filter__content__items__item", {
                        "userPage__filter__content__items__item-clicked":
                          selectedPost === index
                      })}
                    >
                      {data}
                    </div>
                  );
                })}
              </div>
              <hr />
              <div className="userPage__filter__content__editor">
                <p className="userPage__filter__content__editor__label">
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
                      alt="an image"
                      style={styles.image}
                    />
                  )}
                </ProgressiveImage>
                <p
                  onClick={() => this.handleEditor(selectedEC.id)}
                  className="userPage__filter__content__editor__title"
                >
                  {selectedEC.name}
                </p>
                <div>
                  <span className="userPage__filter__content__editor__detail">
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

  handleFeed = index => {
    this.setState({ selectedFeed: index });
  };

  handlePost = index => {
    this.setState({ selectedPost: index });
  };

  handlePostType = type => {
    this.setState({ selectedPostType: type });
  };

  handleEditor = id => {
    this.props.history.push({
      pathname: "/editor_choice/" + id
    });
  };
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default connect(mapStateToProps)(UserPage);
