import React from "react";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import UserIcon from "./UserIcon";
import List, { ListItem } from 'material-ui/List';


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
  },
  menu: {
    justifyContent: 'flex-end',  
  }  
})

const mapStateToProps = store => ({
  account: store.accounts.current
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)

/**
* Navigational bar with links to home, rinks, info and either 
* a login page or the users icon, depending on state
*/

export default enhance(({classes: c, account}) => (
  <div className={c.nav}>
    <List>
      <ListItem className={c.menu}>
        <Link to="/" className={c.link}>Home</Link>
        <Link to="/rinks" className={c.link}>Rinks</Link>
        <Link to="/info" className={c.link}>Info</Link>
        {account.loggedIn === false && <Link to="/login" className={c.link}>Login</Link>}
        {account.loggedIn && <UserIcon />}
      </ListItem>
    </List>
  </div>
));
