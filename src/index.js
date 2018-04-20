// React Common Modules
import React from "react";
import ReactDOM from "react-dom";

import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Reducer from "./Reducers/Reducer";
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { yellow600 } from "material-ui/styles/colors";

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // Middleware for dispatch()
  loggerMiddleware // Middleware for loging
)(createStore);

let store = createStoreWithMiddleware(Reducer);
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: yellow600
  }
});

// Main SCSS
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-animated-slider/build/horizontal.css";

// Root React Component
import App from "./App";

function handleUpdate() {
  console.log(this.state.location);
  let { action } = this.state.location;

  if (action === "PUSH") {
    window.scrollTo(0, 0);
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/hooahu" onUpdate={handleUpdate}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
