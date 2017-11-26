import React from "react";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";
import throttle from "lodash/throttle";
import { currentMonth, tagThemes, times } from "lib/calendar";
import CalendarBookingsTableBlock from "./CalendarBookingsTableBlock";

const formatTime = date =>
  `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}${
    date.getHours() >= 12 ? "PM" : "AM"
  }`;

const styles = theme => ({
  container: {
    marginTop: "0.5rem",
    flex: 1,
    display: "flex"
  },
  times: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: theme.palette.grey[500],
    paddingRight: "0.5rem"
  },
  time: {
    ...theme.typography.caption,
    flex: 1,
    display: "flex"
  },
  bubbles: {
    position: "relative",
    flex: 1,
    width: "100%",
    display: "flex"
  },

  progress: {
    alignItems: "center",
    flex: 1,
    display: "flex",
    justifyContent: "center"
  }
});

const freeTime = (day, startHour, length) => ({
  start: new Date(2017, currentMonth, day, startHour, 0, 0, 0),
  length,
  name: "Free time"
});

const allFreeTimes = (bookings, day, startHour, endHour) => {
  const free = freeTime(day, startHour, endHour-startHour);
  const allFree = [free];

  for (var i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    const idx = allFree.findIndex(el => {
      return (
        booking.start >= el.start &&
        booking.start.getHours() < el.start.getHours() + el.length
      );
    });

    if (idx === -1) {
      continue;
    }

    const time = allFree.splice(idx, 1)[0];

    const first = {
      start: new Date(time.start),
      length: booking.start.getHours() - time.start.getHours(),
      name: "Free time"
    };
    const second = {
      start: new Date(booking.start),
      length: time.length - first.length - booking.length,
      name: "Free time"
    };
    second.start.setHours(booking.start.getHours() + booking.length);

    if (first.length > 0) {
      allFree.push(first);
    }

    if (second.length > 0) {
      allFree.push(second);
    }
  }

  return allFree;
};

class CalendarBookingsTable extends React.PureComponent {
  containerRef = null;

  componentDidMount() {
    this.update();
    this.update.flush();

    window.addEventListener("resize", this.update);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.update);
    this.update.cancel();
  }

  update = throttle(() => {
    const root = this.containerRef;

    if (!root) {
      return;
    }

    this.forceUpdate();
  }, 32);

  updateRef(ref) {
    // The timeout accounts for the time it takes for the table element
    // to transition and reach its full height before the offsets are calculated
    setTimeout(() => {
      this.containerRef = ref;
      this.setState(() => ({ a: "b" })); // This is a dirty hack to be removed
    }, 500);
  }

  render() {
    const containerRef = this.containerRef;
    const { classes: c, rink, day } = this.props;

    return (
      <div className={c.container} ref={ref => this.updateRef(ref)}>
        <div className={c.times}>
          {times(day, rink.startHour, rink.endHour).map(time => (
            <div key={time.getTime()} className={c.time}>
              {formatTime(time)}
            </div>
          ))}
        </div>
        <div className={c.bubbles}>
          {!containerRef ? (
            <div className={c.progress}>
              <CircularProgress />
            </div>
          ) : (
            [
              rink.bookings.map((block, i) => (
                <CalendarBookingsTableBlock
                  booking={block}
                  container={containerRef}
                  day={day}
                  rink={rink}
                  i={i}
                />
              )),
              allFreeTimes(rink.bookings, 1, rink.startHour, rink.endHour).map((block, i) => (
                <CalendarBookingsTableBlock
                  booking={{ ...block, start: block.start.getHours() }}
                  container={containerRef}
                  day={day}
                  rink={rink}
                  i={i}
                  free
                />
              ))
            ]
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CalendarBookingsTable);
