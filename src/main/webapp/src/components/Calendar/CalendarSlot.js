import React from "react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
});

export default withStyles(styles)(({classes: c, day}) => (
  <div className={c.container}>
    {day}
  </div>
));
