import React from "react";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import Menu, { MenuItem } from "material-ui/Menu";
import Avatar from "material-ui/Avatar";
import { Redirect } from "react-router-dom";
import store from "lib/store";
import { doLogout } from "lib/accounts";

const styles = theme => ({
  avatar: {
    display: "flex",
    justifyContent: "flex-end",
    "&:hover": {
      cursor: "pointer"
    }
  }
});

const mapStateToProps = store => ({
  ...store.accounts.current
});

const enhance = compose(withStyles(styles), connect(mapStateToProps));

const logout = () => {
  store.dispatch(doLogout());

  return <Redirect to="/" />;
};

// add menu links for: profile, logout

class UserMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    clicked: 0
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = id => () => {
    return this.setState({ open: false, clicked: id });
  };

  render() {
    const { classes: c, name } = this.props;
    const { clicked } = this.state;

    return (
      <div className={c.avatar}>
        <Avatar
          aria-owns={this.state.open ? "user-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {name
            .split(" ")
            .map(el => el[0])
            .join("")}
        </Avatar>
        <Menu
          id="user-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose(1)}>Profile</MenuItem>
          <MenuItem onClick={this.handleRequestClose(2)}>Logout</MenuItem>
        </Menu>
        {clicked === 1 && <Redirect to="/profile" />}
        {clicked === 2 && logout()}
      </div>
    );
  }
}

export default enhance(UserMenu);
