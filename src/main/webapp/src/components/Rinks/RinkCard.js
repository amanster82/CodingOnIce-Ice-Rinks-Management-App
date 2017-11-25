import React from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const styles = {
  card: {
    margin: "1rem",
    height: "auto"
  },
  media: {
    height: 300
  }
};

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
    rinkEndHour
  } = props;

  return (
    <div>
      <Card className={classes.card}>
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
        <CardActions>
          <Button dense color="primary">
            Calendar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(RinkCard);
