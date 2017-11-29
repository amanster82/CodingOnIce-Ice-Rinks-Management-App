import React from "react";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";
import throttle from "lodash/throttle";
import { tagThemes, times, calendarWeekDays } from "lib/calendar";
import CalendarBookingsTableBlock from "./CalendarBookingsTableBlock";
import { connect } from "react-redux";

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

const freeTime = (currentMonth, day, startHour, length) => ({
  start: new Date(2017, currentMonth - 1, day, startHour, 0, 0, 0),
  length,
  name: "Free time"
});

const allFreeTimes = (allBookings, day, week, currentMonth, startHour, endHour) => {
  const free = freeTime(currentMonth, day, startHour, endHour - startHour);
  const allFree = [free];

  const bookings = allBookings.filter(el => {
    const t = new Date(el.startTime);
    return t.getDate() === day && calendarWeekDays[t.getDay()] === week;
  });

  for (var i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    const bookingDate = new Date(booking.startTime);
    const bookingTime = bookingDate.getHours();
    const idx = allFree.findIndex(el => {
      return (
        bookingDate >= el.start && bookingTime < el.start.getHours() + el.length
      );
    });

    if (idx === -1) {
      continue;
    }

    const time = allFree.splice(idx, 1)[0];

    const first = {
      start: new Date(time.start),
      length: bookingTime - time.start.getHours(),
      name: "Free time"
    };
    const second = {
      start: bookingDate,
      length: time.length - first.length - booking.length,
      name: "Free time"
    };
    second.start.setHours(bookingTime + booking.length);

    if (first.length > 0) {
      allFree.push(first);
    }

    if (second.length > 0) {
      allFree.push(second);
    }
  }

  return allFree;
};

const mapStateToProps = store => ({
  allBookings: store.rinks.bookings,
  currentMonth: store.rinks.currentMonth
});

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
    const { classes: c, rink, day, week, allBookings, currentMonth } = this.props;

    const bookings = !allBookings[rink.id]
      ? rink.bookings
      : allBookings[rink.id];
    const freeTimes = allFreeTimes(
      bookings,
      day,
      week,
      currentMonth,
      rink.startHour,
      rink.endHour
    );

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
          {!containerRef && (
            <div className={c.progress}>
              <CircularProgress />
            </div>
          )}
          {containerRef &&
            !rink.underMaintenance &&
            bookings
              .filter(b => {
                const t = new Date(b.startTime);
                const h = t.getHours();
                return (
                  h >= rink.startHour &&
                  h + b.length <= rink.endHour &&
                  t.getDate() === day &&
                  calendarWeekDays[t.getDay()] === week
                );
              })
              .map((block, i) => (
                <CalendarBookingsTableBlock
                  booking={{
                    ...block,
                    start: new Date(block.startTime).getHours()
                  }}
                  container={containerRef}
                  day={day}
                  rink={rink}
                  i={i}
                  key={rink.id + "-" + block.id}
                />
              ))}
          {containerRef &&
            !rink.underMaintenance &&
            freeTimes.map((block, i) => (
              <CalendarBookingsTableBlock
                booking={{ ...block, start: block.start.getHours() }}
                container={containerRef}
                day={day}
                rink={rink}
                i={i}
                free
                key={block.start.toISOString() + block.length}
              />
            ))}
          {containerRef &&
            rink.underMaintenance && (
              <CalendarBookingsTableBlock
                booking={{
                  start: rink.startHour,
                  length: rink.endHour - rink.startHour,
                  name: "Under maintenance"
                }}
                container={containerRef}
                day={day}
                rink={rink}
                i={0}
              />
            )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(
  withStyles(styles)(CalendarBookingsTable)
);
