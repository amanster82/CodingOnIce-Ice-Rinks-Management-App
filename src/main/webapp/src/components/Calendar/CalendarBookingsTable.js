import React from "react";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";

const currentDate = new Date();
const curMonth = currentDate.getMonth();

const formatTime = date =>
  `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}${
    date.getHours() >= 12 ? "PM" : "AM"
  }`;

const times = day =>
  [9, 10, 11, 12, ...Array.from(Array(5)).map((_v, i) => i + 13)].map(hour => {
    return new Date(2017, curMonth, day, hour, 0, 0, 0);
  });

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
    paddingRight: "0.5rem",
    marginRight: "0.5rem"
  },
  time: {
    ...theme.typography.caption,
    flex: 1,
    display: "flex",
    alignItems: "center"
  },
  bubbles: {
    position: "relative",
    flex: 1,
    width: "100%"
  },
  bubble: {
    position: "absolute",
    textAlign: "left"
  }
});

// start is the starting hour for an event in 24 hr time
const getOffset = (ref, day, times, start) => {
  const comparison = new Date(2017, curMonth, day, start, 0, 0, 0).getTime();
  const end = new Date(2017, curMonth, day, start + 1, 0, 0, 0).getTime();
  const first = times[0].getTime();
  const last = times[times.length - 1].getTime();

  const pixelDiff = ref.clientHeight - 0;
  const timeDiff = last - first;

  const ratio = timeDiff / pixelDiff;

  const timeOffset = comparison - first;
  const endOffset = end - first;
  const pixelOffset = timeOffset / ratio;
  const heightOffset = endOffset / ratio;

  return { top: pixelOffset, height: heightOffset - pixelOffset };
};

const startTimes = [10, 13, 15];

class CalendarBookingsTable extends React.PureComponent {
  containerRef = null;

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
    const { classes: c, bookings, day } = this.props;

    return (
      <div className={c.container} ref={ref => this.updateRef(ref)}>
        <div className={c.times}>
          {times(day).map(time => (
            <div key={time.getTime()} className={c.time}>
              {formatTime(time)}
            </div>
          ))}
        </div>
        <div className={c.bubbles}>
          {!containerRef ? (
            <CircularProgress />
          ) : (
            bookings.slice(0, 3).map(({ name }, i) => (
              <div
                key={i}
                className={c.bubble}
                style={{
                  top:
                    getOffset(containerRef, day, times(day), startTimes[i % 3])
                      .top + "px",
                  height:
                    getOffset(containerRef, day, times(day), startTimes[i % 3])
                      .height + "px"
                }}
              >
                {name}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CalendarBookingsTable);
