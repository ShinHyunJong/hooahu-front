// React Common Modules
import React, { Component } from "react";
// React Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; // Material UI Provider for React
import { AnimatedRoute } from "react-router-transition";

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
  EditorDetailPage
} from "./Pages/";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage} />
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
      </div>
    );
  }
}

export default App;
