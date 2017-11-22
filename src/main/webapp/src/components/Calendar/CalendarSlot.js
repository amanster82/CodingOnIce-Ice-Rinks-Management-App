import React from "react";
import { withStyles } from "material-ui/styles";
import cx from "classnames";

const styles = theme => ({
  container: {
    padding: "0.5rem",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.palette.grey[400],
    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.grey[400],
    transition: theme.transitions.create(["flex"], {
      duration: theme.transitions.duration.complex
    }),
    "&:last-child": {
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.grey[400]
    }
  },
  borderRight: {
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: theme.palette.grey[400]
  },
  full: {
    flex: 1
  },
  expand: {
    flex: 1
  },
  date: {
    cursor: "pointer",
    width: "1rem",
    height: "1rem",
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
  },
  contract: {
    width: "1rem",
    height: "1rem",
    padding: "1rem"
  }
});

export default withStyles(styles)(
  ({ classes: c, index, day, week, selected, selectedWeek, setSelection }) => (
    <div
      className={cx(c.container, {
        [c.full]: selected === null,
        [c.expand]: selected,
        [c.borderRight]: week === "Sat"
      })}
    >
      <div
        className={cx(c.date, {
          [c.contract]: selected !== null && !selected && selectedWeek
        })}
        onClick={() => setSelection(week, index)}
      >
        {day}
      </div>
    </div>
  )
);
