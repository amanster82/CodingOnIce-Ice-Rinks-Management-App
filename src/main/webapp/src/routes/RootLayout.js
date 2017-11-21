import React from "react";
import { Switch, Route } from "react-router";
import Landing from "routes/Landing";
import Rinks from "routes/Rinks";

export default () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/rinks" component={Rinks} />
  </Switch>
);