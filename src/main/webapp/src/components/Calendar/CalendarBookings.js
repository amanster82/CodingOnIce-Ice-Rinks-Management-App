import React from "react";
import { withStyles } from "material-ui/styles";
import CalendarBookingTag from "./CalendarBookingTag";

const tagThemes = ["#27a9e8", "#63c799", "#f16737"];

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

export default withStyles(styles)(({ classes: c, bookings, theme, contract }) => (
  contract ? null : <div className={c.container}>{renderBookings(bookings, 3, c)}</div>
));
