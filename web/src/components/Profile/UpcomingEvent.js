import React from "react";
import { withStyles } from "material-ui/styles";
import { compose, withState } from "recompose";
import { connect } from "react-redux";
import cx from "classnames";

import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import EventIcon from "material-ui-icons/Event";
import ImageIcon from "material-ui-icons/Image";
import EventAvailable from "material-ui-icons/EventAvailable";
import Star from "material-ui-icons/Star";
import Close from "material-ui-icons/Close";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import { calendarMonths } from "lib/calendar";

import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List";

const styles = theme => ({
  left: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1
  },
  right: {
    width: 0,
    overflow: "hidden",
    transition: theme.transitions.create(["width"]),
    transitionDuration: "0.5s",
    transitionTimingFunction: "ease-in",
    whiteSpace: "nowrap"
  },
  slide: {
    width: "35%",
    overflow: "inherit"
  },

  closeSlide: {
    height: "0 !important",
    width: "0 !important"
  },

  close: {
    transition: "width, height",
    transitionDelay: "3s"
  }
});

const mapStateToProps = store => ({
  all: store.rinks.all
});

const enhance = compose(
  withStyles(styles),
  withState("expand", "setExpand", false),
  connect(mapStateToProps)
);

function prettyDateInterval(time) {
  var date = time;

  if (typeof date === "string") {
    date = new Date(date);
  }

  let diff = (diff = (new Date().getTime() - date.getTime()) / 1000);

  var day_diff = Math.floor(Math.abs(diff) / 86400);

  if (isNaN(day_diff)) return;

  const week_diff = Math.ceil(day_diff / 7);
  const month_diff = Math.ceil(day_diff / 30);

  return (
    (day_diff == 0 &&
      (
        (diff < 60 && "just now") ||
        (diff < 120 && "a minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + " minutes") ||
        (diff < 7200 && "about an hour") ||
        (diff < 86400 && `about ${Math.floor(diff / 3600)} hours`))) ||
    (day_diff < -7 && `in ${Math.abs(diff)} days`) ||
    (day_diff == -1 && "in a day") ||
    (day_diff == 1 && "a day") ||
    (day_diff < 7 && day_diff + " days") ||
    (day_diff < 31 &&
      `${week_diff === 1 ? "a" : week_diff} week${
        week_diff === 1 ? "" : "s"
      }`) ||
    `${month_diff === 1 ? "a" : month_diff} month${month_diff === 1 ? "" : "s"}`
  );
}

function prettyDateAbsolute(start) {

  const date = typeof start === "string" ? new Date(start) : start;

  return `${calendarMonths[date.getMonth()+1].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
};

export default enhance(
  ({ classes: c, all, expand, setExpand, rink, booking }) => (
    <ListItem>
      <div className={c.left}>
        <Avatar>
          <EventIcon />
        </Avatar>
        <ListItemText primary={booking.name + " at " + rink.name} secondary={prettyDateAbsolute(booking.startTime)} />
        <ListItemText primary={`Starts in: ${prettyDateInterval(booking.startTime)}`} />

        <IconButton
          className={cx(c.close, { [c.closeSlide]: expand })}
          onClick={() => setExpand(true)}
        >
          <Close className={cx(c.close, { [c.closeSlide]: expand })} />
        </IconButton>
      </div>

      <div className={cx(c.right, { [c.slide]: expand })}>
        <Button raised color="accent" className={c.button}>
          Confirm
        </Button>
        <Button
          raised
          color="accent"
          className={c.button}
          style={{ left: 10 }}
          onClick={() => {
            setExpand(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </ListItem>
  )
);
