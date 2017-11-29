import React from "react";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";

const styles = theme => ({
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
});

export default withStyles(styles)(({classes: c}) => (
  <div className={c.loading}>
    <CircularProgress />
  </div>
));