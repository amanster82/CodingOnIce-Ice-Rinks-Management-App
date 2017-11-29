import React from "react";
import { withStyles } from "material-ui/styles";
import Tabs, { Tab } from "material-ui/Tabs";
import { withState, compose, branch, renderComponent } from "recompose";
import LoginContainer from "./LoginContainer";
import Backdrop from "./backdrop.jpg";
import cx from "classnames";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  overlay: {
    background: `url(${Backdrop}) no-repeat fixed center`,
    height: "100%"
  },

  login: {
    position: "absolute",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "100%",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    animationDelay: '0.1s'
  }
});

const mapStateToProps = store => ({
  account: store.accounts.current
});

const enhance = compose(
  withStyles(styles),
  withState("toggle", "setToggle", 0),
  connect(mapStateToProps),
  branch(({account}) => account.loggedIn, renderComponent(() => <Redirect to="/profile" />))
);

export default enhance(({ classes: c, toggle, setToggle }) => (
    <div className={cx(c.overlay)}>
    <div className={cx(c.login, "animated zoomInUp")}><LoginContainer></LoginContainer></div>
    </div>
));
