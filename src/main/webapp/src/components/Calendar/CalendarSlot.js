import React from "react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },
  date: {
    width: "2rem",
    height: "2rem",
    padding: "1.5rem",
    fontSize: theme.typography.title.fontSize,
    userSelect: "none",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.primary[500],

      color: theme.palette.common.white
    },
    transition: theme.transitions.create(["background-color", "color"], {
      duration: theme.transitions.duration.short
    })
  }
});

export default withStyles(styles)(({ classes: c, day }) => (
  <div className={c.container}>
    <div className={c.date}>{day}</div>
  </div>
));
