import React from "react";
import { withStyles } from "material-ui/styles";
import Calendar from "./Calendar";
import { currentMonth, currentDate, calendarMonths } from "lib/calendar";

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.grey[300],
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  month: {
    ...theme.typography.headline,
    padding: "0.75rem",
    color: theme.palette.primary[700],
    marginLeft: "2rem"
  },
  calendar: {
    padding: "0 1rem 1rem 1rem",
    flex: 1,
    display: "flex"
  }
});

export default withStyles(styles)(({ classes: c }) => (
  <div className={c.container}>
    <div className={c.month}>
      {calendarMonths[currentMonth]} {currentDate.getFullYear()}
    </div>
    <div className={c.calendar}>
      <Calendar />
    </div>
  </div>
));
