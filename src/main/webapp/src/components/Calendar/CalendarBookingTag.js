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

function renderTime(startTime) {
  const time = new Date(startTime);
  const hour = time.getHours();
  
  if (hour < 12) {
    return hour + "a";
  } else {
    return (hour - 12) + "p"; 
  }
}

export default withStyles(styles)(
  ({ classes: c, startTime, name, color }) => (
    <div className={c.container} style={{ backgroundColor: color }}>
      <div className={c.time}>{renderTime(startTime)}</div>
      <div className={c.name}>{name}</div>
    </div>
  )
);
