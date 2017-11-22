import React from "react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  container: {

  }
});

export default withStyles(styles)(({classes: c, day}) => (
  <div>
    {day}
  </div>
));
