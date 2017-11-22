import React from "react";
import { withStyles } from "material-ui/styles";
import CalendarSlot from "./CalendarSlot";
import cx from "classnames";

const styles = theme => ({
  container: {
    verticalAlign: "top",
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    transition: theme.transitions.create(["flex"], {
      duration: theme.transitions.duration.complex
    })
  },
  name: {
    padding: "0 0 1rem 0",
    fontSize: "1.2rem",
    fontWeight: 500,
    color: theme.palette.grey[600],
    textTransform: "uppercase"
  },
  days: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  contract: {
    flex: 0.5
  },
  expand: {}
});

export default withStyles(styles)(
  ({ classes: c, name, days, selected, selectedSlot, setSelection }) => (
    <div
      className={cx(c.container, {
        [c.contract]: selected !== null && !selected,
        [c.expand]: selected
      })}
    >
      <div className={c.name}>{name.slice(0, 3)}</div>
      <div className={c.days}>
        {days.map((day, i) => (
          <CalendarSlot
            day={day}
            key={i}
            index={i}
            week={name}
            selected={!selected ? null : i === selectedSlot}
            selectedWeek={selected}
            setSelection={setSelection}
          />
        ))}
      </div>
    </div>
  )
);
