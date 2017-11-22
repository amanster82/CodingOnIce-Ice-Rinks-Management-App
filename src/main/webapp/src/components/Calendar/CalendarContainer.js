import React from "react";
import { withStyles } from "material-ui/styles";
import Calendar from "./Calendar";

const CalendarMonths = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;

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
      {CalendarMonths[currentMonth]} {currentDate.getFullYear()}
    </div>
    <div className={c.calendar}>
      <Calendar />
    </div>
  </div>
));
