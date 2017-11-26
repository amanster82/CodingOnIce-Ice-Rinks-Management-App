import React from "react";
import { withStyles } from "material-ui/styles";
import cx from "classnames";
import CalendarBookingsContainer from "./CalendarBookingsContainer";
import { withState, compose } from "recompose";
import CalendarBookingCreation from "./CalendarBookingCreation";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";

const styles = theme => ({
  container: {
    position: "relative",
    padding: "0.5rem",
    display: "flex",
    flexDirection: "column",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.palette.grey[400],
    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.grey[400],
    transition: theme.transitions.create(["flex"], {
      duration: theme.transitions.duration.complex
    }),
    "&:last-child": {
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.grey[400]
    }
  },
  borderRight: {
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: theme.palette.grey[400]
  },
  expand: {
    flex: 1
  },
  date: {
    cursor: "pointer",
    width: "1rem",
    height: "1rem",
    padding: "1rem",
    fontSize: theme.typography.title.fontSize,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.grey[700],
    "&:hover": {
      backgroundColor: theme.palette.primary[500],

      color: theme.palette.common.white
    },
    transition: theme.transitions.create(
      ["background-color", "color", "font-size", "font-weight"],
      {
        duration: theme.transitions.duration.short
      }
    )
  },
  expandedDate: {
    ...theme.typography.display3,
    marginLeft: "0.25rem",
    fontWeight: 700,
    color: theme.palette.primary[500],
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary[500]
    },
    transition: theme.transitions.create(
      ["color", "font-size", "font-weight"],
      {
        duration: theme.transitions.duration.short
      }
    )
  },
  contract: {
    width: "1rem",
    height: "1rem",
    padding: "0.75rem"
  },
  bookings: {
    flex: 1,
    display: "flex"
  },
  createButton: {
    position: "absolute",
    height: 36,
    width: 36,
    top: "1rem",
    right: "1rem"
  }
});

const enhance = compose(
  withStyles(styles),
  withState("showDialog", "setShowDialog", false)
);

export default enhance(
  ({
    classes: c,
    index,
    day,
    week,
    selected,
    selectedWeek,
    setSelection,
    showDialog,
    setShowDialog,
    bookings
  }) => (
    <div
      className={cx(c.container, {
        [c.expand]: selected || selected === null,
        [c.borderRight]: week === "Sat"
      })}
    >
      {selected && (
        <Button
          fab
          color="primary"
          aria-label="add"
          className={c.createButton}
          onClick={() => setShowDialog(true)}
        >
          <AddIcon />
        </Button>
      )}
      <div
        className={cx(c.date, {
          [c.contract]: selected !== null && !selected && selectedWeek,
          [c.expandedDate]: selected
        })}
        onClick={() => setSelection(week, index)}
      >
        {day}
      </div>
      <div className={c.bookings}>
        <CalendarBookingsContainer
          bookings={bookings || []}
          timeTable={selected}
          contract={selected !== null && !selected && selectedWeek}
          day={day}
          week={week}
        />
      </div>
      <CalendarBookingCreation
        day={day}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </div>
  )
);
