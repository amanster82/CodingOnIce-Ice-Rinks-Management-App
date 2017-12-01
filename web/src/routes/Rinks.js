import React from "react";
import RinkContainer from "components/Rinks/RinkContainer";
import { withStyles } from "material-ui/styles";
import cx from "classnames";
const styles = theme => ({

  rinks:{
    animationDelay: '0.5s'
  }


});

export default withStyles(styles)(({ classes: c }) => (
  <div>
    <RinkContainer/>
  </div>
));
