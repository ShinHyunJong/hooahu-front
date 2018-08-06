// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import React, { Component } from "react";
import { NavBar, RoundButton, RoundInput } from "../../Components";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, Route } from "react-router-dom";
import TextField from "material-ui/TextField";
import * as UserAction from "../../ActionCreators/UserAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const defaultProps = {};
const propTypes = {};

const styles = {
  input: {
    fontSize: 30,
    border: "2px blue solid"
  },
  inputArea: {
    width: 300,
    fontSize: 30,
    border: "2px green solid"
  },
  underline: {
    border: "2px red solid"
  }
};

const mapStateToProps = state => {
  return {
    actionResult: state.reducer.actionResult
  };
};

class SignUpEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isChecking: false,
      isValid: true,
      isExist: false,
      isLength: true,
      isSecure: true
    };
  }

  render() {
    const { isChecking, isValid, isExist, isLength, isSecure } = this.state;
    return (
      <Container className="signUpEmail">
        <NavBar menuVisible={true} isActive="auth" />
        <Row className="signUpEmail__content">
          <div className="signUpEmail__content__title">
            <h1 className="signUpEmail__content__title__text">
              What is your email?
            </h1>
            <div className="signUpEmail__content__title__inputArea">
              <RoundInput
                type="email"
                placeholder="ex) abc@gmail.com"
                onChange={this.handleEmailInput}
              />
              {isExist ? <p>This account exists.</p> : null}
              {isValid ? null : <p>Invalid Input!</p>}
            </div>

            <div className="signUpEmail__content__title__passwordArea">
              <RoundInput
                type="password"
                placeholder="password"
                onChange={this.handlePasswordInput}
              />
              {isLength ? null : <p>Minimum Length is 8.</p>}
              {isSecure ? null : (
                <p>Password must be in English and numbers.</p>
              )}
            </div>
            <RoundButton
              className="signUpEmail__content__title__button"
              text="Next"
              onClick={this.handleNext}
              textClassName="signUpEmail__content__title__text"
            />
          </div>
        </Row>
      </Container>
    );
  }

  handleNext = () => {
    this.props.history.push({
      pathname: "/signup/username",
      state: {
        type: this.props.location.state.type,
        c_type: this.props.location.state.c_type,
        email: this.state.email,
        password: this.state.password
      }
    });
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleEmailInput = e => {
    this.setState({ email: e.target.value, isChecking: true });
    const { dispatch } = this.props;
    const params = { email: e.target.value };
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    console.log(this.state.email, re.test(e.target.value));
    console.log("checking:", this.state.isChecking);
    console.log("exist?:", this.state.isExist);
    console.log("valid?:", this.state.isValid);
    this.setState({ isValid: re.test(e.target.value) });

    dispatch(UserAction.checkEmail(params)).then(value => {
      if (value.isExists) {
        this.setState({
          isChecking: false,
          isExist: true,
          isValid: re.test(value)
        });
      } else {
        this.setState({
          isChecking: false,
          isExist: false,
          isValid: re.test(value)
        });
      }
    });
  };

  handlePasswordInput = e => {
    this.setState({ password: e.target.value });
    // 3. 영문, 숫자, 특수문자 중 2가지 혼합하여 10자리~20자리 이내.(비밀번호 표준)
    // function chkPwd(str) {
    //   var pw = str;
    //   var num = pw.search(/[0-9]/g);
    //   var eng = pw.search(/[a-z]/ig);
    //   var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    //   if (pw.length < 10 || pw.length > 20) {
    //     alert("10자리 ~ 20자리 이내로 입력해주세요.");
    //     return false;
    //   }
    //   if (pw.search(/₩s/) != -1) {
    //     alert("비밀번호는 공백업이 입력해주세요.");
    //     return false;
    //   }
    //   if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
    //     alert("영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.");
    //     return false;
    //   }
    //   return true;
    // }
    // if (!chkPwd($.trim($('#mpassword').val()))) {
    //   $('#mpassword').val('');
    //   $('#mpassword').focus();
    //   return false;
  };
}

SignUpEmail.defaultProps = defaultProps;
SignUpEmail.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(SignUpEmail));
