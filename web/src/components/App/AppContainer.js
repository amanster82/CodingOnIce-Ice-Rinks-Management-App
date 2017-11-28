import React, { Component } from "react";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import preset from "jss-preset-default";
import createGenerateClassName from "material-ui/styles/createGenerateClassName";
import { BrowserRouter as Router } from "react-router-dom";
import App from "components/App/App";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import "typeface-roboto";
import "./normalize.css";
import "./global.css";
import "./animate.css";
import blue from "material-ui/colors/blue";
import { Provider } from "react-redux";
import store from "lib/store";

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

const theme = createMuiTheme({
  palette: {
    primary: {
      ...blue,
      "300": "#769cc3",
      "500": "#466e92",
      "700": "#124364"
    },
    secondary: {
      ...blue,
      A200: "#f0f8ff"
    }
  }
});

class AppContainer extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <JssProvider jss={jss}>
          <Router>
            <Provider store={store}>
              <App />
            </Provider>
          </Router>
        </JssProvider>
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;
