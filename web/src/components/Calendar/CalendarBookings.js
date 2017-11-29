import React from "react";
import { withStyles } from "material-ui/styles";
import CalendarBookingTag from "./CalendarBookingTag";
import { tagThemes, calendarWeekDays } from "lib/calendar";
import { connect } from "react-redux";
import store from "lib/store";

const styles = theme => ({
  container: {
    flex: 1,
    textAlign: "left",
    marginTop: "0.5rem",
    display: "flex",
    position: "relative"
  },
  count: {
    ...theme.typography.caption
  },
  group: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    overflowY: "auto",
    top: 0,
    left: 0
  },
  bookings: {
    overflowY: "auto"
  }
});

const mapStateToProps = store => ({
  bookings: store.rinks.bookings
})

const renderBookings = (bookings, max, c) => (
  <div className={c.group}>
    <div className={c.bookings}>
      {bookings
        .slice(0, max)
        .map((booking, i) => (
          <CalendarBookingTag
            {...booking}
            color={tagThemes[i % tagThemes.length]}
            key={i}
          />
        ))}
    </div>
    {bookings.length > max && (
      <div className={c.count}>And {bookings.length - max} more</div>
    )}
  </div>
);

export default connect(mapStateToProps)(withStyles(styles)(
  ({ classes: c, contract, rink, day, week, bookings }) =>
    contract || rink.underMaintenance ? null : (
      <div className={c.container}>
        {renderBookings(
          (bookings[rink.id] ? bookings[rink.id] : rink.bookings).filter(
            el =>
              new Date(el.startTime).getDate() === day &&
              calendarWeekDays[new Date(el.startTime).getDay()] === week
          ),
          3,
          c
        )}
      </div>
    )
));
