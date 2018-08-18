// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";

import { connect } from "react-redux";

import * as UserAction from "../../ActionCreators/UserAction";
import { NavBar, Post, Thumb } from "../../Components";
import ec from "../../Json/ec";
import nprogress from "nprogress";
import filterJson from "../../Json/filter";
import cx from "classnames";
import ContentLoader from "react-content-loader";
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

const UserInfoLoader = props => (
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

const UserFeedLoader = props => (
  <div className="userPage__feed__content-loading">
    <ContentLoader
      height={160}
      width={400}
      speed={2}
      primaryColor="#a8a8a8"
      secondaryColor="#ecebeb"
      {...props}
    >
      <rect x="69" y="33" rx="3" ry="3" width="117" height="5" />
      <rect x="69" y="51" rx="3" ry="3" width="85" height="5" />
      <rect x="15.02" y="81.63" rx="3" ry="3" width="320" height="5" />
      <rect x="15" y="98" rx="3" ry="3" width="350" height="5" />
      <rect x="15" y="116" rx="3" ry="3" width="201" height="5" />
      <circle cx="39.2" cy="45.2" r="16" />
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

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      selectedEC: [],
      selectedFeed: 0,
      selectedPost: 0,
      dropdownOpen: false,
      selectedPostType: "Walkie Talkie",
      feedLoading: true,
      feeds: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentWillMount() {
    nprogress.start();
    const randomPackage = Math.floor(Math.random() * 26);
    const selectedEC = ec.editorChoice[randomPackage];
    this.setState({ selectedEC });

    this.getUserFeed();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      previousProps.match.params.user_id !== this.props.match.params.user_id
    ) {
      this.getUserFeed();
    }
  }

  componentDidMount() {
    nprogress.done();
  }

  render() {
    const { isLogin } = this.props;
    const {
      selectedEC,
      selectedPost,
      selectedFeed,
      user,
      feedLoading,
      feeds
    } = this.state;
    const feedType = filterJson.feed_type;
    const postType = filterJson.post_type;
    return (
      <div className="userPage">
        <NavBar listClassName="userPage__tabBar__list" />
        <div className="userPage__notice">
          {feedLoading ? (
            <UserInfoLoader />
          ) : (
            <div className="userPage__notice__content">
              <div className="userPage__notice__content__wrapper">
                <Thumb
                  size={100}
                  src={user && user.profile_img}
                  fontSize={60}
                />
                <div className="userPage__notice__content__wrapper__name">
                  <p>{`${user && user.first_name} ${user &&
                    user.last_name}`}</p>
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
          )}
        </div>

        <div className="userPage__feed">
          <div>
            {feedLoading ? (
              <UserFeedLoader />
            ) : (
              <div className="userPage__feed__userinfo">
                <div className="userPage__feed__userinfo__wrapper">
                  <Thumb
                    className="userPage__feed__userinfo__wrapper-thumb"
                    size={70}
                    src={user && user.profile_img}
                    fontSize={60}
                  />
                  <div className="userPage__feed__userinfo__wrapper__text">
                    <div className="userPage__feed__userinfo__wrapper__text-name">
                      <p>{`${user && user.first_name} ${user &&
                        user.last_name}`}</p>
                    </div>
                    <div className="userPage__feed__userinfo__wrapper__text-info">
                      {user && user.type === "Civ" ? (
                        <p>{user && user.c_type}</p>
                      ) : (
                        <p>Military Personnel</p>
                      )}
                    </div>
                    <div className="userPage__feed__userinfo__wrapper__text-area">
                      {user && user.area}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="userPage__feed__content">
            {feedLoading ? (
              <div style={{ marginTop: 20 }}>
                <UserFeedLoader />
              </div>
            ) : (
              feeds.map((data, index) => {
                return <Post key={index} feed={data} />;
              })
            )}
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

  getUserFeed = () => {
    const { match, dispatch, token } = this.props;
    const user_id = Number(match.params.user_id);
    const params = { user_id, token };

    dispatch(UserAction.getUserByUserID(params)).then(user => {
      dispatch(UserAction.getFeedByUserID(params)).then(value => {
        const userFeeds = value.slice();
        for (let i = 0; i < userFeeds.length; i++) {
          userFeeds[i].images = userFeeds[i].images.map((data, index) => {
            return { original: data.img_url };
          });
        }
        this.setState({ user, feeds: userFeeds, feedLoading: false });
      });
    });
  };
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default connect(mapStateToProps)(UserPage);
