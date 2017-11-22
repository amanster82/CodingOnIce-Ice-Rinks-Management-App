import React from "react";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { fadeIn } from 'react-animations';


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

export default withStyles(styles)(({ classes: c }) => (
  <div className={c.container}>
    <video autoplay="" src="https://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4" className={c.bgvid}></video>
    <div className={c.buttons}>
      <Button color="primary" raised>Reserve a Rink</Button>
      <Button color="primary" raised style={{ left: 10}}>View Rinks</Button>
    </div>
    
  </div>
));