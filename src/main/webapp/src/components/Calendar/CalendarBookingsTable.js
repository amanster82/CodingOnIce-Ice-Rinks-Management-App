import React from "react";
import { withStyles } from "material-ui/styles";

const currentDate = new Date();
const currentMonth = currentDate.getMonth();

/*
const formatTime = date => {
  let minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();

  return `${hours > 12 ? hours - 12 : hours}:${minutes}${
    hours >= 12 ? "pm" : "am"
  }`;
};
*/

const formatTime = date =>
  `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}${
    date.getHours() >= 12 ? "PM" : "AM"
  }`;

const times = day =>
  [9, 10, 11, 12, ...Array.from(Array(5)).map((_v, i) => i + 13)].map(hour => {
    return new Date(2017, currentMonth, day, hour, 0, 0, 0);
  });

const styles = theme => ({
  container: {
    marginTop: '0.5rem',
    flex: 1,
    display: 'flex'
  },
  times: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: theme.palette.grey[500],
    paddingRight: '0.5rem'
  },
  time: {
    ...theme.typography.caption,
    flex: 1
  }
});

export default withStyles(styles)(
  ({ classes: c, bookings, contract, timeTable, day }) => (
    <div className={c.container}>
      <div className={c.times}>
        {times(day).map(time => <div className={c.time}>{formatTime(time)}</div>)}
      </div>
    </div>
  )
);
