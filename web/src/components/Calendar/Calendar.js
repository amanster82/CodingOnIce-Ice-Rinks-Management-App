import React from "react";
import { withStyles } from "material-ui/styles";
import CalendarColumn from "./CalendarColumn";
import { compose, withStateHandlers } from "recompose";
import { calendarWeekDays, daysForWeekDay } from "lib/calendar";
import { connect } from "react-redux";

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

const mapStateToProps = store => ({
  currentMonth: store.rinks.currentMonth
});

const enhanced = compose(
  withStyles(styles),
  withStateHandlers(() => ({ selectedWeek: null, selectedSlot: null }), {
    selectSlot: ({ selectedWeek, selectedSlot }) => (week, slot) => ({
      selectedWeek:
        selectedWeek === week && selectedSlot === slot ? null : week,
      selectedSlot: selectedWeek === week && selectedSlot === slot ? null : slot
    })
  }),
  connect(mapStateToProps)
);

export default enhanced(
  ({ classes: c, selectedWeek, selectedSlot, selectSlot, rink, currentMonth }) => (
    <div className={c.container}>
      {calendarWeekDays.map((weekDay, i) => (
        <CalendarColumn
          key={weekDay}
          name={weekDay}
          days={daysForWeekDay(currentMonth, i)}
          setSelection={selectSlot}
          selected={selectedWeek === null ? null : selectedWeek === weekDay}
          selectedSlot={selectedSlot}
          rink={rink}
        />
      ))}
    </div>
  )
);
