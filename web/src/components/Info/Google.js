import React from "react";
import PropTypes from "prop-types";

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
render() {
    return (
      <div>
      <Map google={this.props.google} 
      
      className={'map'}
      style={{width: '50%', height: '50%', position: 'relative'}}
      zoom={14}
      initialCenter={{
        lat: 48.432373,
        lng: -123.360423
      }}
      >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} 
                position={{lat: 48.432373, lng: -123.360423}} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>hello</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCgcd1zu8pkEntmiA_PciVbInDtqjf8Ze0')
})(MapContainer)

/*
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
    backgroundColor: "rgba(0,0,0,0.3)",
    height: "100%",
    overflowY: "auto",
    display: 'flex'
  },
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: "75%",
    marginLeft: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3
  }),
  mapStyle: {
    ...theme.mixins.gutters({
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      minWidth: 630,
      maxWidth: "40%",
      marginLeft: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 3
    }),
    marginBottom: "2rem"
  },
  column: {
    flex: 1
    //display: "inline-block"
  }
});

function InfoSheet(props) {
  const { classes } = props;
  return (
    <div className={classes.backgroundStyle} style={{backgroundImage: 'url(' + rinkBackground + ')'}}>
      <div className={classes.overlay}>
        <div className={classes.column}>
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
              Commonwealth has 9 indoor ice arenas that can be used by groups
              for a variety of activites.
            </Typography>
          </Paper>
          <Paper className={classes.root}>
            <Typography type="headline" color="primary">
              Contact
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Avatar>
                    <AddLocation/>
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
        <div className={classes.column}>
          <Paper className={classes.mapStyle}>
            <Typography type="headline" color="primary">
              <Map />
              Map
            </Typography>
            <img src={rinkMap} alt="" />
          </Paper>
        </div>
      </div>
    </div>
  );
}

InfoSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoSheet);
*/