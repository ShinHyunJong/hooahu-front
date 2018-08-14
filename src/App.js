// React Common Modules
import React, { Component } from "react";
// React Router
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom"; // Material UI Provider for React

import { connect } from "react-redux";
import * as UserAction from "./ActionCreators/UserAction";

// Own Modules
import {
  DefaultPage,
  DefaultReduxPage,
  HomePage,
  SignUpPage,
  SignUpUserName,
  SignUpUnit,
  SignUpEmail,
  SignUpChoose,
  SignUpCiv,
  SignUpBusiness,
  SignUpWork,
  EditorChoicePage,
  EditorDetailPage,
  UserPage,
  GuidePage,
  TagPage
} from "./Pages/";

const mapStateToProps = state => {
  return {
    isLogin: state.reducer.isLogin,
    token: state.reducer.token
  };
};

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { token } = this.props;
    if (token === null || token === undefined) {
      this.props.history.push({
        pathname: "/"
      });
    } else {
      this.props.dispatch(UserAction.getUser(token));
    }
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/@:user_id" component={UserPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route path="/signup/choose" component={SignUpChoose} />
        <Route path="/signup/email" component={SignUpEmail} />
        <Route path="/signup/username" component={SignUpUserName} />
        <Route path="/signup/civ" component={SignUpCiv} />
        <Route path="/signup/unit" component={SignUpUnit} />
        <Route path="/signup/business" component={SignUpBusiness} />
        <Route path="/signup/reason" component={SignUpWork} />
        <Route exact path="/editor_choice" component={EditorChoicePage} />
        <Route path="/editor_choice/:package" component={EditorDetailPage} />
        <Route exact path="/guide" component={GuidePage} />
        <Route exact path="/tag/:tag_name" component={TagPage} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
