import React from "react";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import UserIcon from "./UserIcon";

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

const mapStateToProps = store => ({
  account: store.accounts.current
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)

export default enhance(({classes: c, account}) => (
  <div className={c.nav}>
    <Link to="/" className={c.link}>Home</Link>
    <Link to="/rinks" className={c.link}>Rinks</Link>
    <Link to="/info" className={c.link}>Info</Link>
    {!account.loggedIn && <Link to="/login" className={c.link}>Login</Link>}
    {account.loggedIn && <UserIcon />}
  </div>
));
