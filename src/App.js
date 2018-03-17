// React Common Modules
import React, { Component } from "react";
// React Router
import { Router, Route, browserHistory, IndexRoute } from "react-router";
// Material UI Provider for React
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Own Modules
import { DefaultPage, DefaultReduxPage, HomePage } from "./Pages/";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/">
            <IndexRoute component={HomePage} />
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
