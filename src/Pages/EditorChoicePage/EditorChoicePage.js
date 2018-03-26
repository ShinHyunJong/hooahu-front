// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { connect } from "react-redux";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { NavBar, CheckBox } from "../../Components";
import { Container, Row, Col } from "reactstrap";
import filterJson from "../../Json/filter";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class EditorChoicePage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,

      selectedConcept: [],
      concept: filterJson.concept,

      selectedDay: [],
      day: filterJson.day,

      selectedArea: [],
      area: filterJson.area,

      currentSort: 0
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    this.props.dispatch(DefaultActionCreator.action());
  }

  handleSort = index => {
    this.setState({ currentSort: index });
  };

  handleCheck = (value, index) => {
    const concept = this.state.concept;
    if (concept[index].clicked === true) {
      concept[index].clicked = false;
      if (index === 0) {
        for (let i = 0; i < concept.length; i++) {
          concept[i].clicked = false;
        }
        this.setState({
          selectedConcept: [],
          concept: concept
        });
      } else {
        const selectedConcept = this.state.selectedConcept;
        let number = selectedConcept.indexOf(value);
        selectedConcept.splice(number, 1);
        this.setState({
          concept: concept,
          selectedConcept: selectedConcept
        });
      }
    } else {
      concept[index].clicked = true;
      concept[0].clicked = false;
      if (index === 0) {
        let array = [];
        for (let i = 0; i < concept.length; i++) {
          if (concept[i].clicked === true) {
            concept[i].clicked = false;
          } else {
            concept[i].clicked = true;
            array.push(concept[i].label);
          }
        }
        let all = array.indexOf("All");
        array.splice(all, 1);
        this.setState({
          concept: concept,
          selectedConcept: array
        });
      } else {
        this.setState(state => ({
          selectedConcept: [...state.selectedConcept, value],
          concept: concept
        }));
      }
    }
  };

  render() {
    console.log(this.state.selectedConcept);
    const conceptJson = filterJson.concept;
    const dayJson = filterJson.day;
    const areaJson = filterJson.area;
    const { currentSort } = this.state;
    return (
      <Container className="editorChoice">
        <NavBar toggle={this.toggle} isOpen={this.state.isOpen} />
        <Row className="editorChoice__content">
          <Col
            sm={{ size: 3, offset: 1 }}
            className="editorChoice__content__filter"
          >
            <Row className="editorChoice__content__filter__row">
              <h3>Concept</h3>
              <Row className="editorChoice__content__filter__row__checkBox">
                {conceptJson.map((concept, index) => {
                  return (
                    <CheckBox
                      key={index}
                      checked={this.state.concept[index].clicked}
                      label={concept.label}
                      onCheck={() => this.handleCheck(concept.label, index)}
                    />
                  );
                })}
              </Row>
            </Row>
            <Row className="editorChoice__content__filter__row">
              <h3>Days</h3>
              <Row className="editorChoice__content__filter__row__checkBox">
                {dayJson.map((day, index) => {
                  return (
                    <CheckBox
                      key={index}
                      label={day.label}
                      onCheck={() => this.handleCheck(day)}
                    />
                  );
                })}
              </Row>
            </Row>
            <Row className="editorChoice__content__filter__row">
              <h3>Area</h3>
              <Row className="editorChoice__content__filter__row__checkBox">
                {areaJson.map((area, index) => {
                  return (
                    <CheckBox
                      key={index}
                      label={area.label}
                      onCheck={() => this.handleCheck(area)}
                    />
                  );
                })}
              </Row>
            </Row>
          </Col>
          <Col sm="8" className="editorChocie__content__list">
            <Row className="editorChoice__content__list__header">
              <div
                className={
                  "editorChoice__content__list__header__" +
                  (currentSort === 0 ? "tab__selected" : "tab")
                }
                onClick={() => this.handleSort(0)}
              >
                <h4>Top Review</h4>
              </div>
              <div
                className={
                  "editorChoice__content__list__header__" +
                  (currentSort === 1 ? "tab__selected" : "tab")
                }
                onClick={() => this.handleSort(1)}
              >
                <h4>Short Distance</h4>
              </div>
              <div
                className={
                  "editorChoice__content__list__header__" +
                  (currentSort === 2 ? "tab__selected" : "tab")
                }
                onClick={() => this.handleSort(2)}
              >
                <h4>Low Cost</h4>
              </div>
            </Row>
            <Row className="editorChoice__content__list__body">
              {this.state.selectedConcept.map((data, index) => {
                return <h2 key={index}>{data}</h2>;
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

EditorChoicePage.defaultProps = defaultProps;
EditorChoicePage.propTypes = propTypes;

export default connect(mapStateToProps)(EditorChoicePage);
