/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import StarBorder from 'material-ui-icons/StarBorder';
import MoneyIcon from 'material-ui-icons/AttachMoney';
import InfoIcon from 'material-ui-icons/InfoOutline';
import IconButton from "material-ui/IconButton";


const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root} subheader={<ListSubheader>Payment Overview</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <MoneyIcon/>
          </ListItemIcon>
          <ListItemText primary="Arena XYZ, Outstanding: $20"/>
          {this.state.open ? <IconButton> <InfoIcon onClick={this.handleClick}/> </IconButton> : <IconButton onClick={this.handleClick}> <InfoIcon/> </IconButton>}
        </ListItem>
        <Collapse component="li" in={this.state.open} transitionDuration="auto" unmountOnExit>
          <List disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);