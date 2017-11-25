import React from "react";
import { withStyles } from "material-ui/styles";
import Calendar from "./Calendar";
import { currentMonth, currentDate, calendarMonths } from "lib/calendar";
import { compose, lifecycle, branch, renderComponent } from "recompose";
import { getRinkById } from "lib/api/rinks";
import { CircularProgress } from "material-ui/Progress";

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
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
});

export default compose(
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      getRinkById(this.props.match.params.id).then(({ res, json }) => {
        this.setState({ rink: json });
      });
    }
  }),
  branch(
    ({ rink }) => !rink,
    renderComponent(({ classes: c }) => (
      <div className={c.loading}>
        <CircularProgress />
      </div>
    )),
    renderComponent(({ classes: c, rink }) => (
      <div className={c.container}>
        <div className={c.month}>
          {rink.name} - {calendarMonths[currentMonth]} {currentDate.getFullYear()}
        </div>
        <div className={c.calendar}>
          <Calendar rink={rink} />
        </div>
      </div>
    ))
  )
)();
