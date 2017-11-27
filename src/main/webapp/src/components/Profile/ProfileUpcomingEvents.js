import React from "react";
import { withStyles } from "material-ui/styles";
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Divider from "material-ui/Divider";
import EventIcon from "material-ui-icons/Event";
import ImageIcon from "material-ui-icons/Image";
import EventAvailable from "material-ui-icons/EventAvailable";
import Star from "material-ui-icons/Star";
import Close from "material-ui-icons/Close";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import { withState, compose } from "recompose";
import cx from "classnames";

const styles = theme => ({
  root: {
    width: "100%",
    background: theme.palette.background.paper,
    overflowY: "auto",
    flex: 1,
    width: "100%",
    height: "100%"
  },


  left: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  right: {
    //flex: 1,
    width: 0,
    overflow: 'hidden',
    transition: theme.transitions.create(["width"]),
    transitionDuration: '0.5s',
    transitionTimingFunction: 'ease-in',
    whiteSpace: 'nowrap'
  },
  slide: {
    width: '35%',
    overflow: 'inherit'
  },

  closeSlide: {
    height: '0 !important',
    width: '0 !important'
  },

  close:{
    transition: 'width, height',
    transitionDelay: '3s'
  }


});
var time = new Date(2017, 11, 2, 23, 15, 2, 0);
export function prettyDate(time) {
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
      ((diff >= -86400 &&
        diff < -7200 &&
        `in about ${Math.abs(Math.floor(diff / 3600))} hours`) ||
        (diff >= -7200 && diff < -3600 && "in about an hour") ||
        (diff >= -3600 &&
          diff < -120 &&
          `in ${Math.abs(Math.floor(diff / 60))} minutes`) ||
        (diff >= -120 && diff < -60 && "in a minute") ||
        (diff >= -60 && diff < 0 && "in a moment") ||
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
    `${month_diff === 1 ? "a" : month_diff} month${
      month_diff === 1 ? "" : "s"
    }`
  );
}

const enhance = compose(
  withStyles(styles),
  withState("slide", "setSlide", false),
  withState("cancel", "setCancel", false)
);

export default enhance(({ classes: c, slide, setSlide, cancel, setCancel }) => (
  <List className={c.root}>
    <ListItem>
      <div className={c.left}>
        <Avatar>
          <EventIcon />
        </Avatar>
        <ListItemText primary="Skating Party" secondary="Dec 02, 2017" />
        <ListItemText primary={`Starts in: ${prettyDate(time)}`} />
        
        <IconButton className={cx(c.close, {[c.closeSlide]: slide})} onClick={() => setSlide(true) }>
          <Close className={cx(c.close, {[c.closeSlide]: slide})}/>
        </IconButton>
  
      </div>


      <div className={cx(c.right, {[c.slide]: slide})}>
        <Button raised color="accent" className={c.button}>
          Confirm
        </Button>
        <Button
          raised
          color="accent"
          className={c.button}
          style={{ left: 10 }}
          onClick={() => {
            setSlide(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </ListItem>
    <Divider inset />
    <ListItem>
      <Avatar>
        <Star style={{ color: "yellow" }} />
      </Avatar>
      <ListItemText primary="Hockey Game" secondary="Jan 20, 2014" />
    </ListItem>
    <ListItem>
      <Avatar>
        <EventAvailable />
      </Avatar>
      <ListItemText primary="Birthday" secondary="Jan 20, 2014" />
    </ListItem>
  </List>
));