import React from "react";
import { Switch, Route } from "react-router";
import Landing from "routes/Landing";
import Rinks from "routes/Rinks";
import Profile from "routes/Profile";
import CalendarContainer from "components/Calendar/CalendarContainer";
import Info from "routes/Info";
import Login from "routes/Login";
import Test from "routes/Test";

export default () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/rinks" component={Rinks} />
    <Route exact path="/profile" component={Profile} />
    <Route path="/calendar/:id" component={CalendarContainer} />
    <Route exact path="/info" component={Info} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/test" component={Test} />
  </Switch>
);
