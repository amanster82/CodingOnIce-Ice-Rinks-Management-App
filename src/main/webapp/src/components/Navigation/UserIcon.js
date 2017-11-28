import React from "react";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import Menu, { MenuItem } from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  avatar: {
    display: 'flex',
    justifyContent: 'flex-end',
    '&:hover': {
      cursor: 'pointer'
    }
  },
});

const mapStateToProps = store => ({
  ...store.accounts.current
})

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
);

// add menu links for: profile, logout

class UserMenu extends React.Component {
  
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {classes: c, name} = this.props;

    return (
      <div className={c.avatar}>
        <Avatar
          aria-owns={this.state.open ? 'user-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {name.split(" ").map(el => el[0]).join("")}
          </Avatar>
        <Menu
          id="user-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose}>
            Profile
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default enhance(UserMenu);