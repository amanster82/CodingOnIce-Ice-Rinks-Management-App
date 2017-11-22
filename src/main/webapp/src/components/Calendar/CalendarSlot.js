import React from "react";
import { withStyles } from "material-ui/styles";
import cx from "classnames";

const styles = theme => ({
  container: {
    
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    borderTopSize: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.palette.grey[300],
    borderLeftSize: "1px",
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.grey[300],
    transition: theme.transitions.create(["flex"], {
      duration: theme.transitions.duration.complex
    }),
    '&:last-child': {
      borderBottomSize: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.grey[300],
    }
  },
  borderRight: {
    borderRightSize: "1px",
    borderRightStyle: "solid",
    borderRightColor: theme.palette.grey[300],
  },
  full: {
    flex: 1,
  },
  expand: {
    flex: 1,
  },
  date: {
    cursor: "pointer",
    width: "2rem",
    height: "2rem",
    padding: "1.5rem",
    fontSize: theme.typography.title.fontSize,
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

export default withStyles(styles)(
  ({ classes: c, index, day, week, selected, setSelection }) => (
    <div className={cx(c.container, { [c.full]: selected === null, [c.expand]: selected, [c.borderRight]: week === "Sat" })}>
      <div className={c.date} onClick={() => setSelection(week, index)}>
        {day}
      </div>
    </div>
  )
);
