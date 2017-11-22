import React from "react";
import { withStyles } from "material-ui/styles";
import cx from "classnames";
import CalendarBookings from "./CalendarBookings";

const bookings = [
  { start: new Date(), duration: 1, name: "Some event 1" },
  { start: new Date(), duration: 1, name: "Some event 2" },
  { start: new Date(), duration: 1, name: "Some event 3" },
  { start: new Date(), duration: 1, name: "Some event 4" }
];

const styles = theme => ({
  container: {
    padding: "0.5rem",
    display: "flex",
    flexDirection: "column",
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
  expand: {
    flex: 1
  },
  date: {
    cursor: "pointer",
    width: "1rem",
    height: "1rem",
    padding: "1rem",
    fontSize: theme.typography.title.fontSize,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.grey[700],
    "&:hover": {
      backgroundColor: theme.palette.primary[500],

      color: theme.palette.common.white
    },
    transition: theme.transitions.create(
      ["background-color", "color", "font-size", "font-weight"],
      {
        duration: theme.transitions.duration.short
      }
    )
  },
  expandedDate: {
    ...theme.typography.display3,
    marginLeft: "0.25rem",
    fontWeight: 700,
    color: theme.palette.primary[500],
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary[500]
    },
    transition: theme.transitions.create(
      ["color", "font-size", "font-weight"],
      {
        duration: theme.transitions.duration.short
      }
    )
  },
  contract: {
    width: "1rem",
    height: "1rem",
    padding: "0.75rem"
  },
  bookings: {
    flex: 1,
    display: "flex"
  }
});

export default withStyles(styles)(
  ({ classes: c, index, day, week, selected, selectedWeek, setSelection }) => (
    <div
      className={cx(c.container, {
        [c.expand]: selected || selected === null,
        [c.borderRight]: week === "Sat"
      })}
    >
      <div
        className={cx(c.date, {
          [c.contract]: selected !== null && !selected && selectedWeek,
          [c.expandedDate]: selected
        })}
        onClick={() => setSelection(week, index)}
      >
        {day}
      </div>
      <div className={c.bookings}>
        <CalendarBookings
          bookings={bookings}
          contract={selected !== null && !selected && selectedWeek}
          timeTable={selected}
        />
      </div>
    </div>
  )
);
