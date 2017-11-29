import React from "react";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import cx from "classnames";
import { withState, compose } from "recompose";
import Login from "components/Login/LoginContainer";
import videoClip from "static/splash.mp4";

const styles = theme => ({
  container: {
    overflow: "hidden !important",
    width: "100%",
    height: "100%"
  },

  bgvid: {
    height: "auto",
    width: "100%",
    display: "inline-block !important",
    position: "absolute",
    top: 0,
    overflow: "hidden !important",
    zIndex: -100
  },

  buttons: {
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
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
    zIndex: 100
  }
});

const enhance = compose(
  withStyles(styles),
  withState("toggle", "setToggle", false)
);

export default enhance(({ classes: c, toggle, setToggle }) => (
  <div className={c.container}>
    <div className={cx(c.buttons, "animated", { fadeOut: toggle === true })}>
      <Button color="primary" raised onClick={() => setToggle(true)}>
        Reserve a Rink
      </Button>
      <Button color="primary" raised style={{ left: 10 }}>
        View Rinks
      </Button>
    </div>

    {toggle && (
      <div className={cx(c.login, "animated", "zoomIn", c)}>
        <div>
          <Login />
        </div>
      </div>
    )}
      <video 
        autoplay="" 
        src={videoClip} 
        type="video/mp4" 
        className={c.bgvid} 
        /> 
  </div>
));
