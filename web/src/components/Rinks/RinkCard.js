import React from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { withState, compose } from "recompose";
import { Redirect } from "react-router-dom";
//import rinkBackground from "./images/solid.jpg";


const styles = theme => ({
  card: {
    margin: "2rem",
    height: "auto",
    opacity: 0.75,
    "&:hover": {
      transition: "all 0.5s ease",
      cursor: "pointer",
      boxShadow: theme.shadows[10]
    },
    "&:hover $view": {
      transition: "all 0.5s ease",
      visibility: "visible",
      color: "white",
      textAlign: "center"
    },
    
    "&:hover $media":{
      filter: 'brightness(50%)',
      transition: "all 0.5s ease",
    }

  },

  view: {
    visibility: "hidden",
    position: "absolute",
    zIndex: "1000",
    top: '50%',
    left: '50%',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    fontSize: '1.25rem'
    
  },

  media: {
    height: 200,
  },

  container: {
    position: 'absolute',
    width: '150px', 
    height: '150px', 
   /* backgroundColor: '#808', */
    marginLeft: '30%',
    marginTop: '6%'
    
  }
});

function RinkCard(props) {
  const {
    classes,
    rinkName,
    rinkImage,
    rinkDescription,
    rinkAddress,
    rinkInfo,
    rinkCapacity,
    rinkStartHour,
    rinkEndHour,
    rinkId,
    redirect,
    setRedirect
  } = props;

  return (
    <div>
      <Card className={classes.card} onClick={() => setRedirect(true)}>
        <div style={{position: 'relative'}}> <div className={classes.container}><div className={classes.view}>View Schedule</div></div></div>
        <CardMedia className={classes.media} image={rinkImage} />
        <CardContent>
          <Typography type="headline" component="h2" color="primary">
            {rinkName}
          </Typography>
          <Typography type="subheading" color="secondary">
            {rinkDescription}
          </Typography>
          <Typography component="p">
            <b>Address:</b> {rinkAddress}
          </Typography>
          <Typography component="p">
            <b>Info:</b> {rinkInfo}
          </Typography>
          <Typography component="p">
            <b>Capacity:</b> {rinkCapacity}
          </Typography>
          <Typography component="p">
            <b>Hours:</b> 0{rinkStartHour}:00 - {rinkEndHour}:00
          </Typography>
        </CardContent>
      </Card>

      {redirect && <Redirect to={"/calendar/" + rinkId} />}
    </div>
  );
}

const enhance = compose(
  withStyles(styles),
  withState("redirect", "setRedirect", false)
);

export default enhance(RinkCard);
