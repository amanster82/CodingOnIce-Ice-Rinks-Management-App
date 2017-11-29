import React from "react";
import { withStyles } from "material-ui/styles";
import Calendar from "./Calendar";
import { currentMonth, currentDate, calendarMonths } from "lib/calendar";
import {
  compose,
  lifecycle,
  branch,
  renderComponent,
  withProps
} from "recompose";
import { getRinkById } from "lib/api/rinks";
import { CircularProgress } from "material-ui/Progress";
import { connect } from "react-redux";
import store from "lib/store";
import { fetchBookings, setMaintenance, fetchAllRinks } from "lib/rinks";
import Button from "material-ui/Button";

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
  },
  maintenance: {
    display: "inline-block",
    marginLeft: "1rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    textTransform: "uppercase"
  },
  maintenanceButton: {
    float: "right"
  }
});

const mapStateToProps = store => ({
  bookings: store.rinks.bookings,
  account: store.accounts.current,
  all: store.rinks.all
});

export default compose(
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      store.dispatch(fetchAllRinks());
      getRinkById(this.props.match.params.id).then(({ res, json }) => {
        this.setState({ rink: json });
        store.dispatch(fetchBookings(json.id));
      });
    }
  }),
  connect(mapStateToProps),
  branch(
    ({ rink, bookings, all }) => !rink || !bookings[rink.id] || !all,
    renderComponent(({ classes: c }) => (
      <div className={c.loading}>
        <CircularProgress />
      </div>
    )),
    renderComponent(({ classes: c, rink, account, all }) => (
      <div className={c.container}>
        <div className={c.month}>
          {rink.name} - {calendarMonths[currentMonth]}{" "}
          {currentDate.getFullYear()}
          {all.find(el => el.id === rink.id).underMaintenance && (
            <div className={c.maintenance}>Under Maintenance</div>
          )}
          {account.admin && (
            <div className={c.maintenanceButton}>
              <Button
                raised
                color="primary"
                onClick={() =>
                  store.dispatch(
                    setMaintenance(
                      rink.id,
                      !all.find(el => el.id === rink.id).underMaintenance
                    )
                  )
                }
              >
                {all.find(el => el.id === rink.id).underMaintenance
                  ? "End Maintenance"
                  : "Start Maintenance"}
              </Button>
            </div>
          )}
        </div>
        <div className={c.calendar}>
          <Calendar rink={rink} />
        </div>
      </div>
    ))
  )
)();
