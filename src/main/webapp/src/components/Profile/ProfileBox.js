import React from "react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    margin: '1rem',
    position: "relative",
    borderRadius: "0.5rem"
  },
  title: {
    ...theme.typography.title,
    padding: '0.5rem',
    background: theme.palette.primary[300],
    color: theme.palette.common.white
  },
  body: {
    padding: '0.5rem'
  }
});

export default withStyles(styles)(({classes: c, title, children}) => (
  <div className={c.container}>
    <div className={c.title}>{title}</div>
    <div className={c.body}>{children}</div>
  </div>
));