// React Common Modules
import React, { Component } from "react";
// React Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; // Material UI Provider for React
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { yellow600 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { AnimatedRoute } from "react-router-transition";

// Own Modules
import {
  DefaultPage,
  DefaultReduxPage,
  HomePage,
  SignUpPage,
  SignUpUserName,
  EditorChoicePage
} from "./Pages/";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: yellow600
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route path="/editor_choice" component={EditorChoicePage} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
