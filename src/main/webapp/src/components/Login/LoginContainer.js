import React from "react";
import { withStyles } from "material-ui/styles";
import Tabs, { Tab } from "material-ui/Tabs";
import { withState, compose } from "recompose";

import Login from "./Login";
import SignUp from "./SignUp";

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
  }
});

const enhance = compose(
  withStyles(styles),
  withState('toggle', 'setToggle', 0)
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
    {toggle === 1 && <Login />}
    {toggle === 0 && <SignUp />}
  </form>
));
