import React from "react";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import Menu, { MenuItem } from 'material-ui/Menu';
//import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

const styles = theme => ({

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
      <div>
        <Button
          color = "secondary"
          aria-owns={this.state.open ? 'user-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {name.split(" ").map(el => el[0]).join("")}
          </Button>
        <Menu
          id="user-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleRequestClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default enhance(UserMenu);