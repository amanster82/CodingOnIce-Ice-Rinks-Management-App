import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import rink1Image from "./images/map.png";


const styles = theme => ({
  backgroundStyle: {
    backgroundSize: 'cover',
    height: '100%',
    overflow: 'hidden'
  },
  overlay: {
    ...theme.mixins.gutters({
      paddingTop: 1,
    }),
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%'
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    maxWidth: 400,
    marginLeft: 50,
    marginTop: theme.spacing.unit * 3,
  }),
  mapStyle: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    maxWidth: 625,
    marginLeft: 50,
    marginTop: theme.spacing.unit * 3,
  }),
});

function InfoSheet(props) {
  const { classes } = props;
  return (
    <div className={classes.backgroundStyle} style={{backgroundImage: 'url(http://www.trip-points.com/media/reviews/photos/original/4f/12/a8/32-minsk-arena-complex-29-1443951652.jpg)'}}>
      <div className={classes.overlay}>
        <Paper className={classes.root}>
          <Typography type="headline" color="secondary">
            Commonwealth Arena Complex
          </Typography>
        </Paper>
        <Paper className={classes.root}>
          <Typography type="headline" color="secondary">
            Arena Information
          </Typography>
          <Typography type="body1">
          Commonwealth has 9 indoor ice arenas that can be used by groups for a variety of activites.
          </Typography>
        </Paper>
        <Paper className={classes.root}>
          <Typography type="headline" color="secondary">
            Contact
          </Typography>
          <Typography type="body1">
            <b>Address:</b> 1925 Patricia Bay Hwy, Victoria, B.C.
          </Typography>
          <Typography type="body1">
            <b>Phone Number:</b> (555) 555-8296
          </Typography>
          <Typography type="body1">
            <b>Email:</b> commonwealtharenacomplex@shaw.ca
          </Typography>
        </Paper>
        <Paper className={classes.mapStyle}>
          <Typography type="headline"  color="secondary">
            Map
          </Typography>
          <img src ="https://i.imgur.com/mw9OtWs.png" />
        </Paper>
      </div>
    </div>
  );
}

InfoSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoSheet);