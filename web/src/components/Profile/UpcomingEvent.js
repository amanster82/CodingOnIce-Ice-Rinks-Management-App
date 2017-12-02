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
import {
  calendarMonths,
  prettyDateAbsolute,
  prettyDateInterval
} from "lib/calendar";
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List";
import store from "lib/store";
import { doCancelBooking } from "lib/rinks";

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

/**
 * Imports the events from the calender and puts it into a list for the users profile
 * Includes option to cancel booking as well 
 */

export default enhance(
  ({ classes: c, all, expand, setExpand, rink, booking }) => (
    <ListItem>
      <div className={c.left}>
        <Avatar>
          <EventIcon />
        </Avatar>
        <ListItemText
          primary={booking.name + " at " + rink.name}
          secondary={prettyDateAbsolute(booking.startTime)}
        />
        <ListItemText
          primary={`Starts in: ${prettyDateInterval(booking.startTime)}`}
        />
        {!expand && (
          <IconButton
            className={cx(c.close, { [c.closeSlide]: expand })}
            onClick={() => setExpand(true)}
          >
            <Close className={cx(c.close, { [c.closeSlide]: expand })} />
          </IconButton>
        )}
      </div>
      <div className={cx(c.right, { [c.slide]: expand })}>
        <Button
          raised
          color="primary"
          className={c.button}
          onClick={() => store.dispatch(doCancelBooking(rink.id, booking.id))}
        >
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
