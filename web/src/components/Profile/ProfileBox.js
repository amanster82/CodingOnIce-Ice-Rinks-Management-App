import React from "react";
import { withStyles } from "material-ui/styles";
import cx from "classnames";

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    margin: "1rem",
    position: "relative",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    ...theme.typography.title,
    padding: "0.5rem",
    background: theme.palette.primary[300],
    color: theme.palette.common.white
  },
  body: {
    padding: "0.5rem",
    display: "flex",
    position: "relative",
    flex: 1
  },
  inner: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    overflowY: "hidden"
  },
  large: {
    gridRow: '1 / span 2'
  }
});

export default withStyles(styles)(({ classes: c, title, children, large }) => (
  <div className={cx(c.container, { [c.large]: large })}>
    <div className={c.title}>{title}</div>
    <div className={c.body}>
      <div className={c.inner}>{children}</div>
    </div>
  </div>
));
