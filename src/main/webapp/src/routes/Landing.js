import React from "react";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import cx from "classnames";
import { withState, compose } from "recompose";

document.body.style.overflow = "hidden";

const styles = theme => ({
  container: {
    overflow: 'hidden !important',
    width: '100%',
    height: '100%'
  },

  bgvid: {
    height: 'auto',
    width: '100%',
    display: 'inline-block !important',
    position: 'relative',
    overflow: 'hidden !important'
  },

  buttons: {
      textAlign: 'center',
      display: 'inline-block',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
  }


})

const enhance = compose(
  withStyles(styles),
  withState('toggle', 'setToggle', false)
);

export default enhance(({ classes: c, toggle, setToggle }) => (
  <div className={c.container}>
    <video autoplay="" src="https://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4" className={c.bgvid}></video>
    <div className={cx(c.buttons, "animated", {"fadeOut": toggle === true})}>
      <Button color="primary" raised onClick={() => setToggle(true)}>Reserve a Rink</Button>
      <Button color="primary" raised style={{ left: 10}}>View Rinks</Button>
    </div>
    {toggle && <div style={{ position: 'absolute', zIndex: 100, top: '50%', left: '50%' }}>it was clicked</div>}
    
  </div>
));