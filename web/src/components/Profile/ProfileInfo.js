import React from "react";
import { withStyles } from "material-ui/styles";
import PermIdentity from 'material-ui-icons/PermIdentity';
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from "material-ui/IconButton";
import CreditCard from "material-ui-icons/CreditCard";
import ModeEdit from "material-ui-icons/ModeEdit";
import Face from "material-ui-icons/Face";
import MailOutline from "material-ui-icons/MailOutline";
import Today from "material-ui-icons/Today";

const styles = theme => ({
      row: {
        display: 'flex',
        justifyContent: 'center',
      },
});

export default withStyles(styles)(({ classes: c }) => (
  <div className={c.container}>
    <List>
      <ListItem>
        <ListItemIcon>
          <Avatar>
            <PermIdentity/>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="id"/>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar>
            <Face/>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="name"/>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar>
            <Today/>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="creationDate"/>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar>
            <MailOutline/>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="email"/>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Avatar>
            <CreditCard/>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Billing Information"/>
        <Button>
          <ModeEdit/>
        </Button>
      </ListItem>
      <ListItem>
        <Button dense color="primary">
          View My Bills
        </Button>
      </ListItem>
      <ListItem>
        <Button dense color="primary">
          View Bookings
        </Button>
      </ListItem>
      <ListItem>
        <Button dense color="primary">
          Edit My Password
        </Button>
      </ListItem>
    <ListItem>
        <Button dense color="primary">
          Log Out
        </Button>
      </ListItem>
    </List>
  </div>
));
