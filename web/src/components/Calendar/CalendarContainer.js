import React from "react";
import { withStyles } from "material-ui/styles";
import Calendar from "./Calendar";
import { calendarMonths } from "lib/calendar";
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
import {
  fetchBookings,
  setMaintenance,
  fetchAllRinks,
  setCurrentMonth
} from "lib/rinks";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import ArrowRight from "material-ui-icons/ArrowForward";
import ArrowLeft from "material-ui-icons/ArrowBack";

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.grey[200],
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  month: {
    ...theme.typography.headline,
    padding: "0.75rem",
    color: theme.palette.primary[700],
    marginLeft: "2rem",
    display: "flex",
    alignItems: "center"
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
    position: 'absolute',
    right: '1rem'
  },
  arrow: {}
});

const mapStateToProps = store => ({
  bookings: store.rinks.bookings,
  account: store.accounts.current,
  all: store.rinks.all,
  currentMonth: store.rinks.currentMonth,
  currentDate: store.rinks.currentDate
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
    renderComponent(
      ({ classes: c, rink, account, all, currentMonth, currentDate }) => (
        <div className={c.container}>
          <div className={c.month}>
            <IconButton
              onClick={() => store.dispatch(setCurrentMonth(currentMonth - 1))}
            >
              <ArrowLeft />
            </IconButton>
            {rink.name} - {calendarMonths[currentMonth]}{" "}
            {currentDate.getFullYear()}
            {all.find(el => el.id === rink.id).underMaintenance && (
              <div className={c.maintenance}>Under Maintenance</div>
            )}
            <IconButton
              onClick={() => store.dispatch(setCurrentMonth(currentMonth + 1))}
            >
              <ArrowRight />
            </IconButton>
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
      )
    )
  )
)();
