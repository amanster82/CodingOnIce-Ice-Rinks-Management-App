import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import rinkBackground from "./images/background.jpg";
import rinkMap from "./images/map.png";
import MailOutline from "material-ui-icons/MailOutline";
import Call from "material-ui-icons/Call";
import Avatar from "material-ui/Avatar";
import AddLocation from "material-ui-icons/AddLocation";
import List, { ListItem, ListItemIcon } from "material-ui/List";
import Map from "material-ui-icons/Map";
import cx from "classnames";
import GoogleMaps from "./GoogleMaps";

const styles = theme => ({
  backgroundStyle: {
    backgroundSize: "cover",
    height: "100%",
    overflow: "hidden",
    position: "relative"
  },
  overlay: {
    ...theme.mixins.gutters({
      paddingTop: 1
    }),
    backgroundColor: "rgba(0,0,0,0.3)",
    height: "100%",
    overflowY: "auto",
    display: "flex"
  },
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: "75%",
    marginLeft: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    opacity: 0.88,
    animationDelay: "0.2s"
  }),
  mapStyle: {
    ...theme.mixins.gutters({
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      minWidth: 630,
      maxWidth: "40%",
      marginLeft: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 3,
      opacity: 0.88
    }),
    marginBottom: "2rem"
  },
  column: {
    flex: 1,
    animationDelay: "0.5s"
  }
});

// General information about the arena with optional google maps add on

function InfoSheet(props) {
  const { classes } = props;
  return (
    <div
      className={classes.backgroundStyle}
      style={{ backgroundImage: "url(" + rinkBackground + ")" }}
    >
      <div className={cx(classes.overlay)}>
        <div className={cx(classes.column)}>
            <Paper className={cx(classes.root, "animated fadeInUp")}>
              <Typography type="headline" color="primary">
                Commonwealth Arena Complex
              </Typography>
            </Paper>
            <Paper className={cx(classes.root, "animated fadeInUp")}>
              <Typography type="headline" color="primary">
                Arena Information
              </Typography>
              <Typography type="body1">
                Commonwealth has 9 indoor ice arenas that can be used by groups
                for a variety of activites.
              </Typography>
            </Paper>
            <Paper className={cx(classes.root, "animated fadeInUp")}>
              <Typography type="headline" color="primary">
                Contact
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Avatar>
                      <AddLocation />
                    </Avatar>
                  </ListItemIcon>
                  <Typography type="body1">
                    1925 Patricia Bay Hwy, Victoria, B.C.
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Avatar>
                      <Call />
                    </Avatar>
                  </ListItemIcon>
                  <Typography type="body1">(555) 555-8296</Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Avatar>
                      <MailOutline />
                    </Avatar>
                  </ListItemIcon>
                  <Typography type="body1">
                    commonwealtharenacomplex@shaw.ca
                  </Typography>
                </ListItem>
              </List>
            </Paper>
          </div>
          <div className={cx(classes.column, "animated fadeInUp")}>
            <Paper className={classes.mapStyle}>
              <Typography type="headline" color="primary">
                <Map />
                Map
              </Typography>
              <img src={rinkMap} alt=""/>
            </Paper>
          </div>
        </div>
      </div>
  );
}

InfoSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoSheet);
