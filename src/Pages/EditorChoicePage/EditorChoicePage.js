// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { NavBar } from "../../Components";
import { Container, Row, Col } from "reactstrap";
import filterJson from "../../Json/filter";
import ec from "../../Json/ec";
import cx from "classnames";
import NumberFormat from "react-number-format";
import ProgressiveImage from "react-progressive-image-loading";
import nprogress from "nprogress";
import ReactTooltip from "react-tooltip";
import _ from "lodash";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

const styles = {
  image: {
    width: 100
  }
};

class EditorChoicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isClicked: filterJson.concept,
      selectedArea: 0,
      selectedDay: 0,
      selectedAreaValue: "",
      selectedDayValue: "",
      editorChoice: ec.editorChoice,
      selectedConcept: [],
      placeCount: 3
    };
  }

  componentWillMount() {
    const concept = filterJson.concept;

    let conceptArray = [];
    for (let i = 1; i < concept.length; i++) {
      conceptArray.push(concept[i].value);
    }
    const sortWithRating = ec.editorChoice
      .sort((a, b) => {
        return a.rating - b.rating;
      })
      .reverse();
    this.setState({
      editorChoice: sortWithRating
    });

    nprogress.start();
  }

  componentDidMount() {
    nprogress.done();
  }

  handleSort = index => {
    this.setState({ currentSort: index });
  };

  handleConcept = index => {
    const { isClicked, editorChoice } = this.state;
    const concept = filterJson.concept;

    if (isClicked[index].clicked === false) {
      // In case of All
      if (index === 0) {
        let newValue = this.state.isClicked.slice();
        newValue[index].clicked = true;
        for (let i = 1; i < concept.length; i++) {
          newValue[i].clicked = false;
        }

        // put all concept in selected Concept
        let newConcept = [];
        for (let i = 1; i < concept.length; i++) {
          newConcept.push(concept[i].value);
        }
        this.setState({ isClicked: newValue, selectedConcept: newConcept });

        let newEditor = editorChoice.slice();
        newEditor = _.sortBy(newEditor, item => {
          return [
            this.state.selectedConcept.map((data, index) => {
              return item.concept[data];
            }),
            item.rating
          ];
        }).reverse();
        this.setState({ editorChoice: newEditor });
      } else {
        // In case of each concept
        let newValue = this.state.isClicked.slice();

        // In case Previous was All
        if (newValue[0].clicked === true) {
          let newConcept = [];
          newConcept.push(concept[index].value);
          let newEditor = editorChoice.slice();
          newEditor = _.sortBy(newEditor, item => {
            return [
              newConcept.map((data, index) => {
                return item.concept[data];
              }),
              item.rating
            ];
          }).reverse();

          // newEditor
          //   .sort(function(a, b) {
          //     return (
          //       a.concept[concept[index].value] -
          //       b.concept[concept[index].value]
          //     );
          //   })
          //   .reverse();
          newValue[0].clicked = false;
          newValue[index].clicked = true;
          this.setState({
            isClicked: newValue,
            editorChoice: newEditor,
            selectedConcept: newConcept
          });
        } else {
          //Push Selected Concept
          let newConcept = this.state.selectedConcept.slice();
          newConcept.push(concept[index].value);
          this.setState({ selectedConcept: newConcept });
          let newEditor = editorChoice.slice();
          newEditor = _.sortBy(newEditor, item => {
            return [
              newConcept.map((data, index) => {
                return item.concept[data];
              }),
              item.rating
            ];
          }).reverse();
          newValue[0].clicked = false;
          newValue[index].clicked = true;
          this.setState({
            isClicked: newValue,
            editorChoice: newEditor,
            selectedConcept: newConcept
          });
        }
      }
    } else {
      let newValue = this.state.isClicked.slice();
      if (newValue.filter(x => x.clicked === true).length === 1) {
        return null;
      } else {
        newValue[index].clicked = false;
        this.setState({ isClicked: newValue });

        //Remove Selected Concept
        let newConcept = this.state.selectedConcept.slice();
        newConcept.splice(newConcept.indexOf(concept[index].value), 1); //num will be [1, 2, 3, 5];

        let newEditor = editorChoice.slice();
        newEditor = _.sortBy(newEditor, item => {
          return [
            newConcept.map((data, index) => {
              return item.concept[data];
            }),
            item.rating
          ];
        }).reverse();
        this.setState({
          editorChoice: newEditor,
          selectedConcept: newConcept
        });
      }
    }
  };

  handleArea = async index => {
    const areaJson = filterJson.area;
    const dayJson = filterJson.day;
    await this.setState({
      editorChoice: ec.editorChoice
    });
    if (index === 0) {
      this.setState({ selectedArea: index, selectedAreaValue: "" });
    } else {
      if (this.state.selectedDayValue !== "") {
        this.setState({ selectedAreaValue: areaJson[index].label });
        const { editorChoice, selectedConcept } = this.state;
        let newEditor = editorChoice.slice();
        newEditor = _.sortBy(newEditor, item => {
          return [
            selectedConcept.map((data, index) => {
              return item.concept[data];
            }),
            item.rating
          ];
        })
          .filter(choices => {
            return choices.days === this.state.selectedDayValue;
          })
          .filter(choices => {
            return choices.area === areaJson[index].label;
          })
          .reverse();
        await this.setState({ editorChoice: newEditor, selectedArea: index });
      } else {
        this.setState({ selectedAreaValue: areaJson[index].label });
        const { editorChoice, selectedConcept } = this.state;
        let newEditor = editorChoice.slice();
        newEditor = _.sortBy(newEditor, item => {
          return [
            selectedConcept.map((data, index) => {
              return item.concept[data];
            }),
            item.rating
          ];
        })
          .filter(choices => {
            return choices.area === areaJson[index].label;
          })

          .reverse();
        await this.setState({ editorChoice: newEditor, selectedArea: index });
      }
    }
  };

  handleDay = async index => {
    const areaJson = filterJson.area;
    const dayJson = filterJson.day;
    await this.setState({ editorChoice: ec.editorChoice });
    if (index === 0) {
      this.setState({ selectedDay: index, selectedDayValue: "" });
    } else {
      if (this.state.selectedAreaValue !== "") {
        this.setState({
          selectedDayValue: dayJson[index].value
        });
        const { editorChoice, selectedConcept } = this.state;
        let newEditor = editorChoice.slice();
        newEditor = _.sortBy(newEditor, item => {
          return [
            selectedConcept.map((data, index) => {
              return item.concept[data];
            }),
            item.rating
          ];
        })
          .filter(choices => {
            return choices.area === this.state.selectedAreaValue;
          })
          .filter(choices => {
            return choices.days === dayJson[index].value;
          })
          .reverse();
        await this.setState({ editorChoice: newEditor, selectedDay: index });
      } else {
        this.setState({
          selectedDayValue: dayJson[index].value
        });
        const { editorChoice, selectedConcept } = this.state;
        let newEditor = editorChoice.slice();
        newEditor = _.sortBy(newEditor, item => {
          return [
            selectedConcept.map((data, index) => {
              return item.concept[data];
            }),
            item.rating
          ];
        })
          .filter(choices => {
            return choices.days === dayJson[index].value;
          })
          .reverse();
        await this.setState({ editorChoice: newEditor, selectedDay: index });
      }
    }
  };

  handleView = id => {
    this.props.history.push({
      pathname: "/editor_choice/" + id
    });
  };

  handleStars = index => {
    const { editorChoice } = this.state;
    const starLength = Number(editorChoice[index].rating);
    console.log(starLength);
    let starArray = [];
    for (let i = 0; i < starLength; i++) {
      return starArray.push(
        <span className="editorChoice__feed__content__lists__list__info__content__stars__star">
          <i className="xi-star" />
        </span>
      );
    }
  };

  render() {
    const { isClicked, selectedArea, selectedDay, placeCount } = this.state;
    const conceptJson = filterJson.concept;
    const dayJson = filterJson.day;
    const areaJson = filterJson.area;
    const { editorChoice } = this.state;

    return (
      <div className="editorChoice">
        <NavBar />
        <div className="editorChoice__feed">
          <div className="editorChoice__feed__content">
            <div className="editorChoice__feed__content__lists">
              {editorChoice === [] || editorChoice.length === 0 ? (
                <div className="editorChoice__feed__noResult">
                  <h3 className="editorChoice__feed__noResult__text">
                    No results are found for given criteria
                  </h3>
                </div>
              ) : (
                editorChoice.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="editorChoice__feed__content__lists__list"
                    >
                      <div className="editorChoice__feed__content__lists__list__text">
                        <h3 className="editorChoice__feed__content__lists__list__text__title">
                          {data.name}
                        </h3>
                        <p className="editorChoice__feed__content__lists__list__text__day">
                          {data.days + " / " + data.area}
                        </p>
                        {data.places.slice(0, placeCount).map((data, index) => {
                          return (
                            <div key={index}>
                              <h6 className="editorChoice__feed__content__lists__list__text__place">
                                {data.name}
                              </h6>
                            </div>
                          );
                        })}
                        <div className="editorChoice__feed__content__lists__list__text__more">
                          <span>
                            +{data.places.length - placeCount} more places
                          </span>
                        </div>
                        <div className="editorChoice__feed__content__lists__list__text__priceArea">
                          <span className="editorChoice__feed__content__lists__list__text__priceArea__text">
                            Average expense
                          </span>
                          <h5 className="editorChoice__feed__content__lists__list__text__priceArea__price">
                            <NumberFormat
                              value={data.price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₩"}
                            />
                          </h5>
                        </div>
                        <div
                          className="editorChoice__feed__content__lists__list__text__view"
                          onClick={() => this.handleView(data.id)}
                        >
                          <span> View Package</span>
                        </div>
                      </div>
                      <div className="editorChoice__feed__content__lists__list__info">
                        <div className="editorChoice__feed__content__lists__list__info__border" />
                        <div className="editorChoice__feed__content__lists__list__info__content">
                          <div className="editorChoice__feed__content__lists__list__info__content__stars">
                            {Array.from(
                              { length: Number(data.rating) },
                              () => ""
                            ).map((data, index) => {
                              return (
                                <span
                                  key={index}
                                  className="editorChoice__feed__content__lists__list__info__content__stars__star"
                                >
                                  <i className="xi-star" />
                                </span>
                              );
                            })}
                          </div>
                          <div className="editorChoice__feed__content__lists__list__info__content__reviewArea">
                            <span className="editorChoice__feed__content__lists__list__info__content__reviewArea__count">
                              {data.reviews}
                            </span>
                            <span className="editorChoice__feed__content__lists__list__info__content__reviewArea__review">
                              reviews
                            </span>
                          </div>
                          <div className="editorChoice__feed__content__lists__list__info__content__conceptArea">
                            <ReactTooltip
                              id="calm"
                              place="top"
                              type="dark"
                              className="editorChoice__tooltip"
                              effect="float"
                            >
                              <span>Calm</span>
                            </ReactTooltip>
                            <span
                              data-tip
                              data-for="calm"
                              className={cx(
                                "editorChoice__feed__content__lists__list__info__content__conceptArea__icon",
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-1":
                                    data.concept.calm === 1
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-2":
                                    data.concept.calm === 2
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-3":
                                    data.concept.calm === 3
                                }
                              )}
                            >
                              <i className="xi-cafe" />
                            </span>
                            <ReactTooltip
                              id="sightSeeing"
                              place="top"
                              type="dark"
                              className="editorChoice__tooltip"
                              effect="float"
                            >
                              <span>Sight Seeing</span>
                            </ReactTooltip>
                            <span
                              data-tip
                              data-for="sightSeeing"
                              className={cx(
                                "editorChoice__feed__content__lists__list__info__content__conceptArea__icon",
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-1":
                                    data.concept.sightSeeing === 1
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-2":
                                    data.concept.sightSeeing === 2
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-3":
                                    data.concept.sightSeeing === 3
                                }
                              )}
                            >
                              <i className="xi-eye" />
                            </span>
                            <ReactTooltip
                              id="dandy"
                              place="top"
                              type="dark"
                              className="editorChoice__tooltip"
                              effect="float"
                            >
                              <span>Dandy</span>
                            </ReactTooltip>
                            <span
                              data-tip
                              data-for="dandy"
                              className={cx(
                                "editorChoice__feed__content__lists__list__info__content__conceptArea__icon",
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-1":
                                    data.concept.dandy === 1
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-2":
                                    data.concept.dandy === 2
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-3":
                                    data.concept.dandy === 3
                                }
                              )}
                            >
                              <i className="xi-glass" />
                            </span>
                            <ReactTooltip
                              id="food"
                              place="top"
                              type="dark"
                              className="editorChoice__tooltip"
                              effect="float"
                            >
                              <span>Hearty eater</span>
                            </ReactTooltip>
                            <span
                              data-tip
                              data-for="food"
                              className={cx(
                                "editorChoice__feed__content__lists__list__info__content__conceptArea__icon",
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-1":
                                    data.concept.food === 1
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-2":
                                    data.concept.food === 2
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-3":
                                    data.concept.food === 3
                                }
                              )}
                            >
                              <i className="xi-restaurant" />
                            </span>
                          </div>
                          <div className="editorChoice__feed__content__lists__list__info__content__conceptArea">
                            <ReactTooltip
                              id="activity"
                              place="top"
                              type="dark"
                              className="editorChoice__tooltip"
                              effect="float"
                            >
                              <span>Alive</span>
                            </ReactTooltip>
                            <span
                              data-tip
                              data-for="activity"
                              className={cx(
                                "editorChoice__feed__content__lists__list__info__content__conceptArea__icon",
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-1":
                                    data.concept.activity === 1
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-2":
                                    data.concept.activity === 2
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-3":
                                    data.concept.activity === 3
                                }
                              )}
                            >
                              <i className="xi-run" />
                            </span>
                            <ReactTooltip
                              id="luxury"
                              place="top"
                              type="dark"
                              className="editorChoice__tooltip"
                              effect="float"
                            >
                              <span>Swagger</span>
                            </ReactTooltip>
                            <span
                              data-tip
                              data-for="luxury"
                              className={cx(
                                "editorChoice__feed__content__lists__list__info__content__conceptArea__icon",
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-1":
                                    data.concept.luxury === 1
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-2":
                                    data.concept.luxury === 2
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-3":
                                    data.concept.luxury === 3
                                }
                              )}
                            >
                              <i className="xi-sketch" />
                            </span>
                            <ReactTooltip
                              id="love"
                              place="top"
                              type="dark"
                              className="editorChoice__tooltip"
                              effect="float"
                            >
                              <span>Love</span>
                            </ReactTooltip>
                            <span
                              data-tip
                              data-for="love"
                              className={cx(
                                "editorChoice__feed__content__lists__list__info__content__conceptArea__icon",
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-1":
                                    data.concept.love === 1
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-2":
                                    data.concept.love === 2
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-3":
                                    data.concept.love === 3
                                }
                              )}
                            >
                              <i className="xi-heart" />
                            </span>
                            <ReactTooltip
                              id="party"
                              place="top"
                              type="dark"
                              className="editorChoice__tooltip"
                              effect="float"
                            >
                              <span>Party Animal</span>
                            </ReactTooltip>
                            <span
                              data-tip
                              data-for="party"
                              className={cx(
                                "editorChoice__feed__content__lists__list__info__content__conceptArea__icon",
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-1":
                                    data.concept.party === 1
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-2":
                                    data.concept.party === 2
                                },
                                {
                                  "editorChoice__feed__content__lists__list__info__content__conceptArea__icon-3":
                                    data.concept.party === 3
                                }
                              )}
                            >
                              <i className="xi-emoticon-cool" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="editorChoice__feed__content__lists__list__image">
                        <img
                          src={data.image_url}
                          className="editorChoice__feed__content__lists__list__image__pic"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="editorChoice__filter">
          <div className="editorChoice__filter__content">
            <div className="editorChoice__filter__content__title">
              <h4 className="editorChoice__filter__content__title__text">
                What's in your mind?
              </h4>
            </div>
            <hr />
            <div className="editorChoice__filter__content__label">
              <p className="editorChoice__filter__content__label__text">
                Concept
              </p>
            </div>
            <div className="editorChoice__filter__content__items">
              {conceptJson.map((data, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => this.handleConcept(index)}
                    className={cx(
                      "editorChoice__filter__content__items__item",
                      {
                        "editorChoice__filter__content__items__item-clicked":
                          isClicked[index].clicked
                      }
                    )}
                  >
                    {data.label}
                  </div>
                );
              })}
            </div>
            <div className="editorChoice__filter__content__label">
              <p className="editorChoice__filter__content__label__text">Area</p>
            </div>
            <div className="editorChoice__filter__content__items">
              {areaJson.map((data, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => this.handleArea(index)}
                    className={cx(
                      "editorChoice__filter__content__items__item",
                      {
                        "editorChoice__filter__content__items__item-clicked":
                          index === selectedArea
                      }
                    )}
                  >
                    {data.label}
                  </div>
                );
              })}
            </div>
            <div className="editorChoice__filter__content__label">
              <p className="editorChoice__filter__content__label__text">Day</p>
            </div>
            <div className="editorChoice__filter__content__items">
              {dayJson.map((data, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => this.handleDay(index)}
                    className={cx(
                      "editorChoice__filter__content__items__item",
                      {
                        "editorChoice__filter__content__items__item-clicked":
                          index === selectedDay
                      }
                    )}
                  >
                    {data.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditorChoicePage.defaultProps = defaultProps;
EditorChoicePage.propTypes = propTypes;

export default connect(mapStateToProps)(EditorChoicePage);
