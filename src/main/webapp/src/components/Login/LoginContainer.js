import React from "react";
import { withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import MenuItem from "material-ui/Menu/MenuItem";
import TextField from "material-ui/TextField";
import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";
import cx from "classnames";
import { withState, compose } from "recompose";
import Button from "material-ui/Button";
import Send from "material-ui-icons/Send";

const styles = theme => ({
  container: {
    background: "rgba(192, 214, 230, 0.9)",
    padding: "40px",
    maxWidth: "447px",
    margin: "40px auto",
    borderRadius: "4px",
    boxShadow: "0 4px 10px 4px rgba(19, 35, 47, 0.3)"
  },

  tabGroup: {
    listStyle: "none",
    padding: "0px",
    margin: "0 0 40px 0",
    display: "flex",
    justifyContent: "center"
  },

  signUp: {
    background: "#466e92",
    color: "#ffffff",

    display: "block",
    textDecoration: "none",
    padding: "15px",
    background: "aliceblue",
    color: "#2f5590",
    fontSize: "21px",
    float: "left",
    width: "100%",
    textAlign: "center",
    cursor: "pointer",
    transition: ".5s ease"
  },

  placeHolder: {
    display: "flex",
    flexDirection: "row"
  },

  firstName: {
    flex: 1
  },

  lastName: {
    flex: 1,
    marginLeft: theme.spacing.unit
  },

  button: {
    margin: theme.spacing.unit
  },

  menu: {
    width: 200
  },

  submit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

const enhance = compose(
  withStyles(styles),
  withState("toggle", "setToggle", 0)
);

export default enhance(({ classes: c, toggle, setToggle }) => (
  <form className={c.container} noValidate autoComplete="off">
    <Tabs
      value={toggle}
      onChange={(ev, value) => setToggle(value)}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="Sign Up" />
      <Tab label="Login" />
    </Tabs>

    {toggle === 0 && (
      <div className={c.placeHolder}>
        <TextField
          id="firstName"
          label="First Name"
          className={c.firstName}
          onChange={(ev, value) => setToggle(value)}
          margin="normal"
        />

        <TextField
          id="lastName"
          label="Last Name"
          className={c.lastName}
          onChange={(ev, value) => setToggle(value)}
          margin="normal"
        />
      </div>
    )}

    {toggle === 0 && (
      <TextField
        id="email"
        label="Email"
        onChange={(ev, value) => setToggle(value)}
        fullWidth
        margin="normal"
      />
    )}

    {toggle === 0 && <div />}

    {toggle === 0 && (
      <TextField
        id="password"
        label="Set a Password"
        onChange={(ev, value) => setToggle(value)}
        fullWidth
        margin="normal"
      />
    )}

    {toggle === 0 && <div style={{ height: "25px" }} />}

    {toggle === 0 && (
      <div className={c.submit}>
        <Button className={c.button} raised color="primary">
          Get Started
        </Button>
      </div>
    )}

    {toggle === 1 && (
      <TextField
        id="email"
        label="Email"
        onChange={(ev, value) => setToggle(value)}
        fullWidth
        margin="normal"
      />
    )}

    {toggle === 1 && <div />}

    {toggle === 1 && (
      <TextField
        id="password"
        label="Password"
        onChange={(ev, value) => setToggle(value)}
        fullWidth
        margin="normal"
      />
    )}

    {toggle === 1 && <div style={{ height: "25px" }} />}

    {toggle === 1 && (
      <div className={c.submit}>
        <Button className={c.button} raised color="primary">
          Log in
        </Button>
      </div>
    )}
  </form>
));
