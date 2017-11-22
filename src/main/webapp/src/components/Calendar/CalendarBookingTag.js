import React from "react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  container: {
    padding: "0.25rem",
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: "0.8rem",
    display: "flex",
    "&:not(:first-child)": {
      marginTop: "0.25rem"
    }
  },
  name: {
    flex: 1,
    textAlign: "right",
    textTransform: "uppercase",
    textOverflow: "ellipsis"
  },
  time: {}
});

export default withStyles(styles)(
  ({ classes: c, start, duration, name, color }) => (
    <div className={c.container} style={{ backgroundColor: color }}>
      <div className={c.time}>8p</div>
      <div className={c.name}>{name}</div>
    </div>
  )
);
