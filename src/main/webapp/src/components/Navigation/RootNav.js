import React from "react";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";

const styles = theme => ({
  nav: {
    float: 'right',
    flex: '1',
    textAlign: 'right'
  },
  link: {
    display: 'inline-block',
    color: 'white',
    textDecoration: 'none',
    '&:not(:last-child)': {
      marginRight: '1rem'
    },
    '&:hover': {
      color: 'orange'
    }
  }
})

export default withStyles(styles)(({classes: c}) => (
  <div className={c.nav}>
    <Link to="/" className={c.link}>Home</Link>
    <Link to="/rinks" className={c.link}>Rinks</Link>
    <Link to="/info" className={c.link}>Info</Link>
    <Link to="/login" className={c.link}>Login</Link>
  </div>
));
