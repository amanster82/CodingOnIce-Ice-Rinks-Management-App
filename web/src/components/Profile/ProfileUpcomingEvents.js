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
import { withState, compose, lifecycle } from "recompose";
import cx from "classnames";
import store from "lib/store";
import { connect } from "react-redux";
import { fetchAllRinks } from "lib/rinks";

import UpcomingEvent from "./UpcomingEvent";

const styles = theme => ({
  root: {
    width: "100%",
    background: theme.palette.background.paper,
    overflowY: "auto",
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
var time = new Date(2017, 11, 2, 23, 15, 2, 0);

const mapStateToProps = store => ({
  all: store.rinks.all,
  account: store.accounts.current
});

const enhance = compose(
  withStyles(styles),
  withState("slide", "setSlide", false),
  withState("cancel", "setCancel", false),
  lifecycle({
    componentDidMount() {
      store.dispatch(fetchAllRinks());
    }
  }),
  connect(mapStateToProps)
);

const currentDate = new Date();

export default enhance(
  ({ classes: c, slide, setSlide, cancel, setCancel, all, account }) => (
    <List className={c.root}>
      {all && all.length && all
        .map(el => el.bookings.map(b => ({ rink: el, booking: b })))
        .reduce((left, right) => left.concat(right))
        .filter(el => new Date(el.booking.startTime) > currentDate)
        .map(el => <UpcomingEvent rink={el.rink} booking={el.booking} key={el.rink.id + "-" + el.booking.id}/>)}
    </List>
  )
);
