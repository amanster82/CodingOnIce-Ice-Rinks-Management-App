import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import rinkMap from "./images/map.png";
import rinkBackground from "./images/background.jpg"; 


const styles = theme => ({
  backgroundStyle: theme.mixins.gutters({
    paddingTop: 1
  }),
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    maxWidth: 400,
    marginLeft: 50,
    marginTop: theme.spacing.unit * 3
  }),
  mapStyle: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    maxWidth: 625,
    marginLeft: 50,
    marginTop: theme.spacing.unit * 3
  })
});

function InfoSheet(props) {
  const { classes } = props;
  return (
    <div
      className={classes.backgroundStyle}
      style={{
          backgroundImage: 'url(' + rinkBackground + ')',
          display: 'flex',
          backgroundSize: 'cover',
          height: '100%',
      }}
    >
      {" "}
      <div style={{float: 'left'}}>
        <Paper className={classes.root}>
          <Typography type="headline" color="primary">
            Commonwealth Arena Complex
          </Typography>
        </Paper>
        <Paper className={classes.root}>
          <Typography type="headline" color="primary">
            Arena Information
          </Typography>
          <Typography type="body1">
            Commonwealth has 9 indoor ice arenas that can be used by groups for
            a variety of activites.
          </Typography>
        </Paper>
        <Paper className={classes.root}>
          <Typography type="headline" color="primary">
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
      </div>
      <div>
        <Paper className={classes.mapStyle} style={{float: 'left'}}>
          <Typography type="headline" color="primary">
            Map
          </Typography>
          <img src = {rinkMap} alt=""/> 
        </Paper>
      </div>
    </div>
  );
}

InfoSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoSheet);
