// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import { NavBar } from "../../Components";
import { Container, Row, Col } from "reactstrap";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

import filterJson from "../../Json/filter";
import ec from "../../Json/ec";
import cx from "classnames";
import NumberFormat from "react-number-format";
import ProgressiveImage from "react-progressive-image-loading";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import nprogress from "nprogress";

import scrollToComponent from "react-scroll-to-component";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
const defaultProps = {};
const propTypes = {};

const styles = {
  image: {
    width: "100%"
  }
};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class EditorDetailPage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    nprogress.done();
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  handleTravel = () => {
    scrollToComponent(this.test, {
      offset: -75,
      align: "top",
      duration: 1200,
      ease: "outCirc"
    });
  };

  render() {
    const choice = Number(this.props.match.params.package);
    const ecJson = ec.editorChoice;
    const selectedChoice = ecJson[choice - 1];
    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={14}
          defaultCenter={{ lat: 37.527555, lng: 127.040512 }}
        >
          <Marker position={{ lat: 37.527555, lng: 127.040512 }} />

          {/* <Marker position={{ lat: 37.526911, lng: 127.03787 }} opacity={0.5} /> */}
          <MarkerWithLabel
            position={{ lat: 37.526911, lng: 127.03787 }}
            onClick={() => {
              console.log("check!!");
            }}
            labelAnchor={new google.maps.Point(0, 0)}
            labelStyle={{
              backgroundColor: "#5b5e6d",
              color: "white",
              fontSize: "16px",
              padding: "8px"
            }}
          >
            <div className="editorDetail__googlemapLabel">2</div>
          </MarkerWithLabel>
        </GoogleMap>
      ))
    );

    return (
      <div className="editorDetail">
        <NavBar />
        <div className="editorDetail__content">
          <div className="editorDetail__content__package">
            <div className="editorDetail__content__package__text">
              <div className="editorDetail__content__package__text__stars">
                <span className="editorDetail__content__package__text__stars__star">
                  <i className="xi-star" />
                </span>
                <span className="editorDetail__content__package__text__stars__star">
                  <i className="xi-star" />
                </span>
                <span className="editorDetail__content__package__text__stars__star">
                  <i className="xi-star" />
                </span>
              </div>
              <h2 className="editorDetail__content__package__text__title">
                {selectedChoice.name}
              </h2>
              <div className="editorDetail__content__package__text__infoArea">
                <p className="editorDetail__content__package__text__infoArea__info">
                  {selectedChoice.days + " / " + selectedChoice.area}
                </p>
                <p className="editorDetail__content__package__text__infoArea__info">
                  {selectedChoice.places.length +
                    " places" +
                    " / " +
                    selectedChoice.distance +
                    "km"}
                </p>
              </div>

              <p className="editorDetail__content__package__text__desc">
                "Hey soldier! How's your saving account doing so far? 한국에서도
                럭셔리한 하루를 즐길 수 있다네. 잘 열리는 지갑을 준비하도록."
              </p>

              <div className="editorDetail__content__package__text__priceArea">
                <div className="editorDetail__content__package__text__priceArea__price">
                  <p className="editorDetail__content__package__text__priceArea__price__text">
                    Average expense
                  </p>
                  <h4 className="editorDetail__content__package__text__priceArea__price__price">
                    $200,00
                  </h4>
                </div>
                <div className="editorDetail__content__package__text__priceArea__travel">
                  <div
                    className="editorDetail__content__package__text__priceArea__travel__button"
                    onClick={this.handleTravel}
                  >
                    Start travel!
                  </div>
                </div>
              </div>

              <div className="editorDetail__content__package__text__detail">
                <div className="editorDetail__content__package__text__detail__concept">
                  <div className="editorDetail__content__package__text__detail__concept__row">
                    <span className="editorDetail__content__package__text__detail__concept__row__icon">
                      <i className="xi-star" />
                    </span>
                    <span className="editorDetail__content__package__text__detail__concept__row__icon">
                      <i className="xi-star" />
                    </span>
                    <span className="editorDetail__content__package__text__detail__concept__row__icon">
                      <i className="xi-star" />
                    </span>
                    <span className="editorDetail__content__package__text__detail__concept__row__icon">
                      <i className="xi-star" />
                    </span>
                  </div>
                  <div className="editorDetail__content__package__text__detail__concept__row">
                    <span className="editorDetail__content__package__text__detail__concept__row__icon">
                      <i className="xi-star" />
                    </span>
                    <span className="editorDetail__content__package__text__detail__concept__row__icon">
                      <i className="xi-star" />
                    </span>
                    <span className="editorDetail__content__package__text__detail__concept__row__icon">
                      <i className="xi-star" />
                    </span>
                    <span className="editorDetail__content__package__text__detail__concept__row__icon">
                      <i className="xi-star" />
                    </span>
                  </div>
                </div>
                <div className="editorDetail__content__package__text__detail__comment">
                  <div className="editorDetail__content__package__text__detail__comment__like">
                    <span className="editorDetail__content__package__text__detail__comment__like__icon">
                      <i className="xi-heart-o" />
                    </span>
                  </div>
                  <div className="editorDetail__content__package__text__detail__comment__review">
                    <span className="editorDetail__content__package__text__detail__comment__review__icon">
                      <i className="xi-speech-o" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="editorDetail__content__package__image">
              <Nav tabs>
                <NavItem className="editorDetail__content__package__image__tabs">
                  <NavLink
                    className={cx(
                      "editorDetail__content__package__image__tabs__tab",
                      {
                        active: this.state.activeTab === "1"
                      }
                    )}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Photos
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={cx(
                      "editorDetail__content__package__image__tabs__tab",
                      {
                        active: this.state.activeTab === "2"
                      }
                    )}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    Map
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <img
                    src="https://i.imgur.com/u08v6FH.jpg"
                    style={styles.image}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXyr_w-hrjwCHZblSHVsFSxsvyDPDvrVc&language=en&region=US"
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "400px" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                  />
                </TabPane>
              </TabContent>
            </div>
          </div>
          <div className="editorDetail__content__places">
            <div className="editorDetail__content__places__title">
              <h1
                ref={section => {
                  this.test = section;
                }}
                className="editorDetail__content__places__title__text"
              >
                Places
              </h1>
            </div>
            <hr className="editorDetail__hr" />

            <div className="editorDetail__content__places__place">
              <div className="editorDetail__content__places__place__image">
                <ProgressiveImage
                  preview="https://i.imgur.com/GmO0CtQ.jpg"
                  src="https://i.imgur.com/GmO0CtQ.jpg"
                  style={styles.image}
                  render={(src, style) => (
                    <img
                      src={src}
                      style={Object.assign(style, {
                        width: "100%"
                      })}
                    />
                  )}
                />
              </div>
              <div className="editorDetail__content__places__place__text">
                <h2 className="editorDetail__content__places__place__text__title">
                  01
                </h2>
                <h2 className="editorDetail__content__places__place__text__title__text">
                  Apgoojeong Station
                </h2>
                <p className="editorDetail__content__places__place__text__function">
                  Transportation
                </p>
                <div className="editorDetail__content__places__place__text__infoArea">
                  <div className="editorDetail__content__places__place__text__infoArea__row">
                    <span className="editorDetail__content__places__place__text__infoArea__row__icon">
                      <i className="xi-maker" />
                    </span>
                    <span className="editorDetail__content__places__place__text__infoArea__row__text">
                      12-sajik ro, Jongro-gu, Seoul
                    </span>
                  </div>
                  <div className="editorDetail__content__places__place__text__infoArea__row">
                    <span className="editorDetail__content__places__place__text__infoArea__row__icon">
                      <i className="xi-time-o" />
                    </span>
                    <span className="editorDetail__content__places__place__text__infoArea__row__text">
                      0:00 ~ 24:00
                    </span>
                  </div>
                  <div className="editorDetail__content__places__place__text__infoArea__row">
                    <span className="editorDetail__content__places__place__text__infoArea__row__icon">
                      <i className="xi-call" />
                    </span>
                    <span className="editorDetail__content__places__place__text__infoArea__row__text">
                      02-412-4050
                    </span>
                  </div>
                </div>
                <div className="editorDetail__content__places__place__text__desc">
                  <p className="editorDetail__content__places__place__text__desc__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris ullamcorper commodo mauris nec facilisis. Donec quis
                    porta tellus, nec interdum dui.
                  </p>
                </div>
                <div className="editorDetail__content__places__place__text__infoArea">
                  <div className="editorDetail__content__places__place__text__infoArea__row">
                    <span className="editorDetail__content__places__place__text__infoArea__row__area">
                      Area 1 :
                    </span>
                    <span className="editorDetail__content__places__place__text__infoArea__row__text">
                      6h 17min
                    </span>
                  </div>
                  <div className="editorDetail__content__places__place__text__infoArea__row">
                    <span className="editorDetail__content__places__place__text__infoArea__row__area">
                      Area 2 :
                    </span>
                    <span className="editorDetail__content__places__place__text__infoArea__row__text">
                      2h 10min
                    </span>
                  </div>
                  <div className="editorDetail__content__places__place__text__infoArea__row">
                    <span className="editorDetail__content__places__place__text__infoArea__row__area">
                      Area 3 :
                    </span>
                    <span className="editorDetail__content__places__place__text__infoArea__row__text">
                      1h 5min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditorDetailPage.defaultProps = defaultProps;
EditorDetailPage.propTypes = propTypes;

export default connect(mapStateToProps)(EditorDetailPage);
