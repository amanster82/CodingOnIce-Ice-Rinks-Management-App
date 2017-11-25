import React from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { withStateHandlers, compose } from "recompose";
import { withStyles } from "material-ui/styles";
import {} from "lib/api/accounts";
import { Redirect } from "react-router-dom";

const styles = theme => () => ({});

export default ({classes: c}) => (
  <div>
    <TextField
      id="email"
      label="Email"
      fullWidth
      margin="normal"
    />
    <TextField
      id="password"
      label="Password"
      fullWidth
      margin="normal"
      type="password"
    />
    <Button raised color="primary">
      Log in
    </Button>
  </div>
);
