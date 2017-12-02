import React from "react";
import { Provider } from "react-redux";
import store from "lib/store";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import AppBar from "material-ui/AppBar";
import RootLayout from "routes/RootLayout";

describe("<App />", () => {

  const mounted = mount(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );

  const shallowed = shallow(<App />);

  it("should match its empty snapshot", () => {
    expect(shallowed).toMatchSnapshot();
  });

  it("should render a single app bar", () => {
    expect(mounted.find(AppBar).length).toBe(1);
  });

  it("should render the root layout", () => {
    expect(mounted.find(RootLayout).length).toBe(1);
  });
});
