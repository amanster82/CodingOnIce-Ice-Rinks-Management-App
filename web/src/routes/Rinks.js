import React from "react";
import RinkContainer from "components/Rinks/RinkContainer";
import { withStyles } from "material-ui/styles";

const styles = theme => ({});

export default withStyles(styles)(({ classes: c }) => (
  <div>
    <RinkContainer />
  </div>
));
