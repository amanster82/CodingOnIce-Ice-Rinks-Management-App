import React from "react";
import { withStyles } from "material-ui/styles";
import CalendarSlot from "./CalendarSlot";

const styles = theme => ({
  container: {
    display: "inline-block",
    verticalAlign: 'top'
  },
  name: {},
  days: {}
});

export default withStyles(styles)(({ classes: c, name, days }) => (
  <div className={c.container}>
    <div className={c.name}>{name}</div>
    <div className={c.days}>
      {days.map((day, i) => <CalendarSlot day={day} key={i} />)}
    </div>
  </div>
));
