import React from "react";
import { withStyles } from "material-ui/styles";
import CalendarSlot from "./CalendarSlot";

const styles = theme => ({
  container: {
    verticalAlign: 'top',
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    padding: '1rem 0',
    fontSize: theme.typography.headline.fontSize,
    color: theme.palette.grey[600]
  },
  days: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }
});

export default withStyles(styles)(({ classes: c, name, days }) => (
  <div className={c.container}>
    <div className={c.name}>{name}</div>
    <div className={c.days}>
      {days.map((day, i) => <CalendarSlot day={day} key={i} />)}
    </div>
  </div>
));
