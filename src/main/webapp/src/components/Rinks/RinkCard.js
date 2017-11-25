import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 425,
  },
  media: {
    height: 300,
  },
};

function RinkCard(props) {
    const { classes, rinkName, rinkImage, rinkDescription, rinkAddress, rinkInfo, rinkCapacity, rinkHours } = props;
    console.log(rinkImage);
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={rinkImage}
          />
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
              <b>Hours:</b> {rinkHours}
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

RinkCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RinkCard);
