import React from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { withState, compose } from "recompose";
import { Redirect } from "react-router-dom";
//import rinkBackground from "./images/solid.jpg";

const styles = theme => ({
  card: {
    position: "relative",
    margin: "2rem",
    height: "auto",
    "&:hover": {
      transition: "all 0.5s ease",
      cursor: "pointer",
      boxShadow: theme.shadows[10]
    },
    "&:hover $view": {
      transition: "all 0.5s ease",
      visibility: "visible",
      color: "white"
    },

    "&:hover $media": {
      filter: "brightness(50%)",
      transition: "all 0.5s ease"
    }
  },

  view: {
    visibility: "hidden",
    zIndex: "1000",
    fontSize: "1.25rem"
  },

  media: {
    height: 200
  },

  container: {
    position: "absolute",
    width: "100%",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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

  /**
   * A card template for all rinks to be loaded into, contains position for 
   * an image, the rink name, description, address, info, capacity and hours
   */

  return (
    <div>
      <Card className={classes.card} onClick={() => setRedirect(true)}>
        <div className={classes.container}>
          <div className={classes.view}>View Schedule</div>
        </div>
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
            <b>Hours:</b> {rinkStartHour < 10 ? "0" : ""}
            {rinkStartHour}:00 - {rinkEndHour}:00
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
