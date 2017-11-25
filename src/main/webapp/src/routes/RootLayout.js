import React from "react";
import { Switch, Route } from "react-router";
import Landing from "routes/Landing";
import Rinks from "routes/Rinks";
import CalendarContainer from "components/Calendar/CalendarContainer";
import Login from "routes/Login";

export default () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/rinks" component={Rinks} />
    <Route exact path="/calendar" component={CalendarContainer} />
    <Route exact path="/login" component={Login} />
  </Switch>
);
