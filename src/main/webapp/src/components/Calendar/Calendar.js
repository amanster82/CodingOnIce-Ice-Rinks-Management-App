import React from "react";
import { withStyles } from "material-ui/styles";
import CalendarColumn from "./CalendarColumn";
import { compose, withStateHandlers } from "recompose";

const calendarWeekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const daysInMonth = month => {
  return (
    28 +
    (month + Math.floor(month / 8)) % 2 +
    2 % month +
    2 * Math.floor(1 / month)
  );
};
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const offset =
  currentMonth === 1
    ? 0
    : Array.from(Array(currentMonth - 1))
        .map((_val, mon) => daysInMonth(mon + 1))
        .reduce((left, cur) => left + cur) % 7;

const daysInPrevMonth = daysInMonth(currentMonth - 1);
const daysInCurMonth = daysInMonth(currentMonth);
const prevMonth =
  currentMonth === 1
    ? []
    : Array.from(Array(daysInPrevMonth))
        .map((_val, day) => day + 1)
        .slice(daysInPrevMonth - offset, daysInPrevMonth);
const nextMonth = 35 - prevMonth.length - daysInCurMonth;

const daysForWeekDay = (month, weekDay) =>
  [
    ...prevMonth,
    ...Array.from(Array(daysInCurMonth)).map((_val, day) => day + 1),
    ...Array.from(Array(nextMonth)).map((_val, day) => day + 1)
  ].filter((_day, i) => i % 7 === weekDay);

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    display: "flex",
    flex: 1,
    position: "relative",
    borderRadius: "0.5rem"
  }
});

const enhanced = compose(
  withStyles(styles),
  withStateHandlers(() => ({ selectedWeek: null, selectedSlot: null }), {
    selectSlot: ({ selectedWeek, selectedSlot }) => (week, slot) => ({
      selectedWeek:
        selectedWeek === week && selectedSlot === slot ? null : week,
      selectedSlot: selectedWeek === week && selectedSlot === slot ? null : slot
    })
  })
);

export default enhanced(
  ({ classes: c, selectedWeek, selectedSlot, selectSlot }) => (
    <div className={c.container}>
      {calendarWeekDays.map((weekDay, i) => (
        <CalendarColumn
          key={weekDay}
          name={weekDay}
          days={daysForWeekDay(currentMonth, i)}
          setSelection={selectSlot}
          selected={selectedWeek === null ? null : selectedWeek === weekDay}
          selectedSlot={selectedSlot}
        />
      ))}
    </div>
  )
);
